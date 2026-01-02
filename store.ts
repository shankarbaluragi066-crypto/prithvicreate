
import { useState, useEffect, useCallback } from 'react';
import { Service, Order, SiteSettings, User } from './types';
import { INITIAL_SERVICES, INITIAL_ORDERS, INITIAL_SETTINGS } from './constants';

/**
 * DB_KEYS: Internal identifiers for local persistence
 */
const DB_KEYS = {
  SERVICES: 'pc_db_services',
  ORDERS: 'pc_db_orders',
  SETTINGS: 'pc_db_settings',
  USERS: 'pc_db_users',
  SESSION: 'pc_db_current_session'
};

export const useStore = () => {
  // --- 1. Database Initialization Logic ---
  const loadFromDB = <T>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error(`Database Error: Failed to hydrate ${key}`, err);
    }
    return defaultValue;
  };

  const saveToDB = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      if (err instanceof DOMException && err.name === 'QuotaExceededError') {
        console.error("Database Quota Exceeded! Media files might be too large.");
        alert("Your browser's storage is full. Try uploading smaller video/image files.");
      } else {
        console.error(`Database Error: Failed to commit ${key}`, err);
      }
    }
  };

  // --- 2. State Definitions (The "Tables") ---
  const [users, setUsers] = useState<User[]>(() => 
    loadFromDB(DB_KEYS.USERS, [{
      id: 'admin-1',
      email: 'admin@prithvi.com',
      password: 'admin123',
      name: 'Admin',
      role: 'admin'
    }])
  );

  const [services, setServicesState] = useState<Service[]>(() => 
    loadFromDB(DB_KEYS.SERVICES, INITIAL_SERVICES)
  );

  const [orders, setOrdersState] = useState<Order[]>(() => 
    loadFromDB(DB_KEYS.ORDERS, INITIAL_ORDERS)
  );

  const [settings, setSettingsState] = useState<SiteSettings>(() => 
    loadFromDB(DB_KEYS.SETTINGS, INITIAL_SETTINGS)
  );

  const [currentUser, setCurrentUser] = useState<User | null>(() => 
    loadFromDB(DB_KEYS.SESSION, null)
  );

  // --- 3. Database Sync Effects ---
  useEffect(() => { saveToDB(DB_KEYS.USERS, users); }, [users]);
  useEffect(() => { saveToDB(DB_KEYS.SERVICES, services); }, [services]);
  useEffect(() => { saveToDB(DB_KEYS.ORDERS, orders); }, [orders]);
  useEffect(() => { saveToDB(DB_KEYS.SETTINGS, settings); }, [settings]);
  useEffect(() => { 
    if (currentUser) {
      saveToDB(DB_KEYS.SESSION, currentUser);
    } else {
      localStorage.removeItem(DB_KEYS.SESSION);
    }
  }, [currentUser]);

  // --- 4. Store API (The "Queries") ---

  const setServices = useCallback((newServices: Service[]) => {
    setServicesState(newServices);
  }, []);

  const setOrders = useCallback((newOrders: Order[]) => {
    setOrdersState(newOrders);
  }, []);

  const setSettings = useCallback((newSettings: SiteSettings) => {
    setSettingsState(newSettings);
  }, []);

  const login = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, pass: string) => {
    if (users.find(u => u.email === email)) return false;
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password: pass,
      role: 'visitor'
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return {
    // Data
    services,
    orders,
    settings,
    currentUser,
    
    // Status
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'admin',
    
    // Actions
    setServices,
    setOrders,
    setSettings,
    login,
    signup,
    logout
  };
};
