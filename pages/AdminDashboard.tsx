
import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MOCK_ANALYTICS } from '../constants';
import { Service, Order } from '../types';

interface AdminDashboardProps {
  store: any;
}

// Helper to detect media type for previews
const isVideoMedia = (url: string) => {
  return url.startsWith('data:video') || 
         url.toLowerCase().endsWith('.mp4') || 
         url.toLowerCase().endsWith('.webm') || 
         url.toLowerCase().endsWith('.mov');
};

/**
 * RichTextEditor Component
 * Custom lightweight implementation using contentEditable
 */
const RichTextEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const handleCommand = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="border border-slate-200 rounded-[2rem] overflow-hidden bg-slate-50 focus-within:bg-white focus-within:border-blue-600 transition-all shadow-inner group">
      <div className="flex gap-1 p-3 border-b border-slate-100 bg-white/80 sticky top-0 z-10 backdrop-blur-sm">
        <button 
          type="button" 
          onClick={() => handleCommand('bold')} 
          title="Bold"
          className="w-10 h-10 rounded-xl hover:bg-slate-100 font-black flex items-center justify-center text-sm border border-transparent hover:border-slate-200 transition active:scale-95"
        >B</button>
        <button 
          type="button" 
          onClick={() => handleCommand('italic')} 
          title="Italic"
          className="w-10 h-10 rounded-xl hover:bg-slate-100 italic flex items-center justify-center text-sm border border-transparent hover:border-slate-200 transition active:scale-95"
        >I</button>
        <div className="w-[1px] h-6 bg-slate-200 my-auto mx-1"></div>
        <button 
          type="button" 
          onClick={() => handleCommand('insertUnorderedList')} 
          title="Bullet List"
          className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition active:scale-95 border border-transparent hover:border-slate-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <button 
          type="button" 
          onClick={() => handleCommand('insertOrderedList')} 
          title="Numbered List"
          className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition active:scale-95 border border-transparent hover:border-slate-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4m0 0l4-4m-4 4h18" /></svg>
        </button>
      </div>
      <div 
        ref={editorRef}
        contentEditable
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onBlur={(e) => onChange(e.currentTarget.innerHTML)}
        className="px-8 py-6 outline-none min-h-[16rem] prose prose-slate max-w-none bg-transparent rich-content"
      />
    </div>
  );
};

const StatCard = ({ title, value, change, color }: { title: string, value: any, change: string, color: string }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
    <div className={`absolute top-0 right-0 w-16 h-16 ${color} opacity-10 rounded-bl-[4rem]`}></div>
    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{title}</p>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-black text-slate-900">{value}</span>
      <span className={`text-[10px] font-bold ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
    </div>
  </div>
);

const TabButton = ({ active, onClick, number, label }: { active: boolean, onClick: () => void, number: string, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 pb-4 border-b-2 transition relative ${active ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
  >
    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400'}`}>{number}</span>
    <span className="font-black text-xs uppercase tracking-widest">{label}</span>
    {active && <div className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-blue-600 blur-[2px]"></div>}
  </button>
);

const StatsOverview = ({ store }: { store: any }) => {
  const activeOrders = store.orders.filter((o: Order) => o.status === 'active').length;
  const totalRevenue = store.orders.reduce((acc: number, o: Order) => acc + o.totalAmount, 0);

  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-black text-slate-900 mb-8">Performance Snapshot</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} change="+12%" color="bg-blue-600" />
        <StatCard title="Active Orders" value={activeOrders} change="+2" color="bg-indigo-600" />
        <StatCard title="Impressions" value="12.4K" change="+1.2K" color="bg-slate-900" />
        <StatCard title="Avg. Ticket" value="$82" change="-3%" color="bg-slate-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-6 flex justify-between">
            Revenue Trend
            <span className="text-xs font-normal text-slate-400">Last 7 Days</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-lg mb-6 flex justify-between">
            Recent Orders
            <Link to="/admin/orders" className="text-xs text-blue-600">View All</Link>
          </h3>
          <div className="space-y-4">
            {store.orders.slice(0, 4).map((order: Order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-bold text-sm text-slate-900">{order.clientName}</p>
                  <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">${order.totalAmount}</p>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesManagement = ({ store }: { store: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'pricing' | 'media'>('overview');
  const [isPublishing, setIsPublishing] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<Service>>({
    title: '', 
    description: '', 
    price: 0, 
    category: 'Video Editing', 
    deliveryDays: 1, 
    revisions: 1, 
    images: [], 
    videos: [],
    pdfs: [],
    features: [''],
    status: 'published'
  });

  const handleOpenModal = (service?: Service) => {
    setActiveTab('overview');
    if (service) {
      setEditingId(service.id);
      setFormData({
        ...service,
        images: service.images || [],
        videos: service.videos || [],
        pdfs: service.pdfs || [],
        features: service.features && service.features.length > 0 ? service.features : ['']
      });
    } else {
      setEditingId(null);
      setFormData({ 
        title: '', 
        description: '', 
        price: 0, 
        category: 'Video Editing', 
        deliveryDays: 1, 
        revisions: 1, 
        images: [], 
        videos: [],
        pdfs: [],
        features: [''],
        status: 'published'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveService = async (forcedStatus?: 'published' | 'draft') => {
    setIsPublishing(true);
    await new Promise(r => setTimeout(r, 400));

    try {
      const finalStatus = forcedStatus || formData.status || 'published';
      const finalData = {
        ...formData,
        status: finalStatus,
        images: formData.images && formData.images.length > 0 ? formData.images : ['https://picsum.photos/seed/' + Math.random() + '/800/600'],
        features: (formData.features || []).filter(f => f.trim() !== '')
      };

      if (editingId) {
        store.setServices(store.services.map((s: Service) => 
          s.id === editingId ? { ...s, ...finalData } : s
        ));
      } else {
        const newService: Service = {
          ...finalData as Service,
          id: Date.now().toString(),
          impressions: 0,
          clicks: 0,
        };
        store.setServices([...store.services, newService]);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving gig:', err);
      alert('An error occurred while publishing your gig.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'images' | 'videos' | 'pdfs') => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Smart detection: Put videos in videos array, images in images array
        const actualField = field === 'pdfs' ? 'pdfs' : (base64.startsWith('data:video') ? 'videos' : 'images');
        
        setFormData(prev => ({
          ...prev,
          [actualField]: [...(prev[actualField] || []), base64]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (type: 'images' | 'videos' | 'pdfs', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...(formData.features || []), ''] });
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Gigs</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your active service listings</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition flex items-center gap-2"
        >
          <span className="text-xl">+</span> Create a New Gig
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {store.services.map((service: Service) => (
          <div key={service.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm group hover:shadow-md transition relative">
            <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden">
              <img src={service.images[0]} className="w-full h-full object-cover transition duration-300 group-hover:scale-105" alt={service.title} />
              <div className="absolute top-4 left-4">
                 <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest shadow-sm ${service.status === 'published' ? 'bg-green-600 text-white' : 'bg-slate-900 text-white'}`}>
                    {service.status === 'published' ? 'Live' : 'Draft'}
                 </span>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => handleOpenModal(service)}
                  className="p-2 bg-white/90 backdrop-blur text-slate-900 rounded-lg shadow hover:bg-white transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </button>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 mb-1 line-clamp-2 min-h-[3rem]">{service.title}</h3>
              <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                   <div className="w-6 h-6 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center font-bold">PC</div>
                   <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{service.category}</span>
                </div>
                <span className="font-black text-blue-600 text-lg">${service.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-5xl my-auto flex flex-col relative max-h-[90vh]">
            <div className="px-10 pt-10 pb-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div className="flex gap-8">
                <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} number="1" label="Overview" />
                <TabButton active={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')} number="2" label="Pricing" />
                <TabButton active={activeTab === 'media'} onClick={() => setActiveTab('media')} number="3" label="Gallery" />
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/></svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-10 bg-slate-50/30">
              {activeTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="col-span-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Gig Title</label>
                        <input 
                          type="text" 
                          value={formData.title} 
                          onChange={e => setFormData({...formData, title: e.target.value})}
                          placeholder="I will edit your professional youtube videos..."
                          className="w-full text-2xl font-bold px-0 py-2 border-b-2 border-slate-100 focus:border-blue-600 outline-none transition bg-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Category</label>
                        <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none bg-slate-50 focus:bg-white transition font-bold">
                          <option>Video Editing</option>
                          <option>Graphic Design</option>
                          <option>Copywriting</option>
                          <option>SEO Strategy</option>
                          <option>Brand Identity</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Gig Description (Rich Text)</label>
                        <RichTextEditor 
                          value={formData.description || ''} 
                          onChange={val => setFormData({...formData, description: val})} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pricing' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm">
                      <h4 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-black">$</span>
                        Pricing Setup
                      </h4>
                      <div className="space-y-8">
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 px-1">Price ($)</label>
                          <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none font-bold bg-slate-50 focus:bg-white transition" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 px-1">Delivery Time</label>
                          <select value={formData.deliveryDays} onChange={e => setFormData({...formData, deliveryDays: Number(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none font-bold bg-slate-50 focus:bg-white transition">
                            {[1,2,3,4,5,7,10,14,21,30].map(d => <option key={d} value={d}>{d} Days Delivery</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 px-1">Revisions</label>
                          <select value={formData.revisions} onChange={e => setFormData({...formData, revisions: Number(e.target.value)})} className="w-full px-5 py-4 rounded-2xl border border-slate-200 outline-none font-bold bg-slate-50 focus:bg-white transition">
                            {[0,1,2,3,5,10,99].map(r => <option key={r} value={r}>{r === 99 ? 'Unlimited' : r} Revisions</option>)}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-2 bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                       <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Service Features</label>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {(formData.features || []).map((feat, index) => (
                           <div key={index} className="flex gap-2 group relative">
                             <input type="text" value={feat} onChange={e => updateFeature(index, e.target.value)} placeholder="e.g. 4K Source File" className="flex-grow px-5 py-4 rounded-2xl border border-slate-200 outline-none bg-slate-50 focus:bg-white transition text-sm font-bold" />
                             <button onClick={() => setFormData(prev => ({...prev, features: prev.features?.filter((_, i) => i !== index)}))} className="absolute -right-2 -top-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-lg">×</button>
                           </div>
                         ))}
                       </div>
                       <button onClick={addFeature} className="mt-8 px-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-400 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition w-full">+ Add Feature</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h4 className="font-bold text-2xl text-slate-900">Showcase Gallery</h4>
                        <p className="text-sm text-slate-500 mt-1">Upload high-quality images and videos. We auto-detect your file types.</p>
                      </div>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-8 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition shadow-xl flex items-center gap-3"
                      >
                        Upload Media
                      </button>
                      <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*,video/*" onChange={e => handleFileUpload(e, 'images')} />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {/* Combined Gallery View for Admin */}
                      {[...(formData.images || []), ...(formData.videos || [])].map((url, i) => {
                        const isVid = isVideoMedia(url);
                        return (
                          <div key={i} className="aspect-video rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden relative group shadow-sm">
                            {isVid ? (
                               <div className="w-full h-full">
                                 <video src={url} className="w-full h-full object-cover" muted playsInline />
                                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/10">
                                   <div className="w-10 h-10 bg-white/40 backdrop-blur rounded-full flex items-center justify-center text-white border border-white/20">
                                     <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                   </div>
                                 </div>
                               </div>
                            ) : (
                               <img src={url} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                               <button 
                                 onClick={() => {
                                   const isActuallyVideo = isVideoMedia(url);
                                   const targetArray = isActuallyVideo ? 'videos' : 'images';
                                   setFormData(prev => ({
                                      ...prev,
                                      [targetArray]: (prev[targetArray] || []).filter(u => u !== url)
                                   }));
                                 }} 
                                 className="p-3 bg-red-600 text-white rounded-xl shadow-xl hover:scale-110 transition"
                               >
                                 Delete
                               </button>
                            </div>
                          </div>
                        );
                      })}
                      <button onClick={() => fileInputRef.current?.click()} className="aspect-video rounded-3xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 hover:border-blue-200 hover:text-blue-400 transition bg-slate-50/50">
                        <span className="text-2xl mb-1">+</span>
                        <span className="text-[10px] font-black uppercase">Add Media</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h4 className="font-bold text-2xl text-slate-900">Documents (PDF)</h4>
                      </div>
                      <button 
                        onClick={() => pdfInputRef.current?.click()}
                        className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition shadow-xl"
                      >
                        Upload PDF
                      </button>
                      <input type="file" ref={pdfInputRef} className="hidden" multiple accept=".pdf" onChange={e => handleFileUpload(e, 'pdfs')} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(formData.pdfs || []).map((pdf, i) => (
                        <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100 group">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-xs">PDF</div>
                              <span className="text-sm font-black text-slate-900 truncate max-w-[12rem]">Document_{i+1}.pdf</span>
                           </div>
                           <button onClick={() => removeMedia('pdfs', i)} className="p-2 text-slate-300 hover:text-red-500 transition">Delete</button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-10 py-8 border-t border-slate-100 flex justify-between items-center bg-white sticky bottom-0 z-20">
               <div className="flex items-center gap-6">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Publish Status:</span>
                  <div className="flex bg-slate-100 rounded-xl p-1.5 border border-slate-200">
                    <button onClick={() => setFormData({...formData, status: 'published'})} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition ${formData.status === 'published' ? 'bg-green-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>Active</button>
                    <button onClick={() => setFormData({...formData, status: 'draft'})} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition ${formData.status === 'draft' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>Draft</button>
                  </div>
               </div>
               <div className="flex gap-4">
                 <button onClick={() => setIsModalOpen(false)} className="px-8 py-4 text-sm font-bold text-slate-500 hover:text-slate-900 transition" disabled={isPublishing}>Cancel</button>
                 <button onClick={() => handleSaveService('published')} disabled={isPublishing} className="px-12 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-2xl hover:bg-blue-700 transition transform active:scale-95 disabled:opacity-50">
                   {isPublishing ? 'Publishing...' : 'Save & Publish Gig Live'}
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const OrdersManagement = ({ store }: { store: any }) => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusUpdate = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingId(orderId);
    
    // 1. Update store
    const updatedOrders = store.orders.map((o: Order) => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    store.setOrders(updatedOrders);

    // 2. Mock Email Notification via Formspree
    const order = store.orders.find((o: Order) => o.id === orderId);
    if (order) {
      try {
        await fetch('https://formspree.io/f/xnjndvwd', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            subject: `Order Status Update: ${order.id}`,
            clientName: order.clientName,
            clientEmail: order.clientEmail,
            newStatus: newStatus.toUpperCase(),
            message: `Hello ${order.clientName}, your order for ${order.id} has been marked as ${newStatus.toUpperCase()}.`
          })
        });
      } catch (e) {
        console.error("Failed to send notification email", e);
      }
    }

    setUpdatingId(null);
  };

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Active Queue</h1>
          <p className="text-slate-500 text-sm mt-1">Direct management of client project statuses</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          {store.orders.length} Total Orders
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 border-b border-slate-200">
            <tr>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Project Details</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Client</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Amount</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Workflow Status</th>
              <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {store.orders.map((order: Order) => (
              <tr key={order.id} className="hover:bg-slate-50/30 transition group">
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 text-sm">{order.id}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase mt-1">Ordered {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex flex-col">
                    <p className="font-bold text-sm text-slate-900">{order.clientName}</p>
                    <p className="text-xs text-slate-500 font-medium">{order.clientEmail}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="font-black text-slate-900 text-sm">${order.totalAmount}</span>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="relative group/actions inline-block">
                    <select 
                      disabled={updatingId === order.id}
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                      className={`appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-widest outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer pr-10 ${updatingId === order.id ? 'opacity-50 grayscale' : ''}`}
                    >
                      <option value="pending">Mark Pending</option>
                      <option value="active">Start Project</option>
                      <option value="completed">Complete Job</option>
                      <option value="cancelled">Cancel Order</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {store.orders.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active orders in queue</p>
          </div>
        )}
      </div>
    </div>
  );
};

const FullAnalytics = ({ store }: { store: any }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <h1 className="text-3xl font-black text-slate-900 mb-10">Gig Deep Dive</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="font-bold mb-6">Order Volume</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="date" /><YAxis /><Tooltip /><Bar dataKey="orders" fill="#2563eb" radius={[4, 4, 0, 0]} /></BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200">
          <h3 className="font-bold mb-6">Traffic Sources</h3>
          <div className="space-y-6">
            <ProgressRow label="Search Engine" percent={65} color="bg-blue-600" />
            <ProgressRow label="Direct Visit" percent={20} color="bg-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressRow = ({ label, percent, color }: { label: string, percent: number, color: string }) => (
  <div>
    <div className="flex justify-between text-xs font-bold mb-2">
      <span className="text-slate-500 uppercase tracking-widest">{label}</span>
      <span>{percent}%</span>
    </div>
    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

const SiteEditor = ({ store }: { store: any }) => {
  const [success, setSuccess] = useState(false);

  const handleUpdate = (updates: any) => {
    store.setSettings({ ...store.settings, ...updates });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  const handleSeoUpdate = (updates: any) => {
    store.setSettings({ ...store.settings, seo: { ...store.settings.seo, ...updates } });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <div className="max-w-2xl animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-900">Site Customization</h1>
        {success && <span className="text-green-600 font-bold text-sm animate-pulse">Changes Saved</span>}
      </div>
      <div className="space-y-8 bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">Site Branding</label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500">Business Name</span>
              <input className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none bg-slate-50 focus:bg-white transition" value={store.settings.name} onChange={e => handleUpdate({ name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500">Logo Initial</span>
              <input className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none bg-slate-50 focus:bg-white transition" value={store.settings.logo} onChange={e => handleUpdate({ logo: e.target.value })} />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold uppercase text-slate-400 mb-3 tracking-widest">SEO Controls</label>
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500">Meta Title</span>
              <input className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none bg-slate-50 focus:bg-white transition" value={store.settings.seo.metaTitle} onChange={e => handleSeoUpdate({ metaTitle: e.target.value })} />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500">Meta Description</span>
              <textarea className="w-full px-5 py-3 border border-slate-200 rounded-xl outline-none h-24 bg-slate-50 focus:bg-white transition resize-none" value={store.settings.seo.metaDescription} onChange={e => handleSeoUpdate({ metaDescription: e.target.value })} />
            </div>
          </div>
        </div>
        <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl"><p className="text-xs text-blue-700 font-medium">Changes are instantly synced.</p></div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ store }) => {
  const location = useLocation();

  const SidebarLink = ({ to, label, icon }: { to: string, label: string, icon: string }) => {
    const isActive = location.pathname === `/admin${to === '/' ? '' : to}`;
    return (
      <Link 
        to={`/admin${to}`}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-600 hover:bg-slate-100'}`}
      >
        <span className="text-lg">{icon}</span>
        <span className="font-semibold text-sm">{label}</span>
      </Link>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col fixed h-full z-10">
        <div className="mb-10 px-2">
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Workspace</h2>
          <p className="text-lg font-bold text-slate-900">Admin Console</p>
        </div>
        <nav className="flex-grow space-y-1">
          <SidebarLink to="/" label="Dashboard" icon="📊" />
          <SidebarLink to="/services" label="Gigs / Services" icon="💼" />
          <SidebarLink to="/orders" label="Order Queue" icon="📦" />
          <SidebarLink to="/analytics" label="Deep Insights" icon="📈" />
          <SidebarLink to="/settings" label="Site Settings" icon="⚙️" />
        </nav>
      </aside>
      <main className="flex-grow ml-64 p-8">
        <Routes>
          <Route path="/" element={<StatsOverview store={store} />} />
          <Route path="/services" element={<ServicesManagement store={store} />} />
          <Route path="/orders" element={<OrdersManagement store={store} />} />
          <Route path="/analytics" element={<FullAnalytics store={store} />} />
          <Route path="/settings" element={<SiteEditor store={store} />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;
