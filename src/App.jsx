import React, { useState, useMemo } from 'react';
import { ShoppingCart, Leaf, Star, Info, Sparkles, Loader2, Package, TrendingDown, Replace, MapPin, Search, ChevronDown, Users, BarChart as BarChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Helper Icon Components ---
const Trophy = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
);

const Gift = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="4" rx="1" />
        <path d="M12 8v13" />
        <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
        <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 5a4.8 8 0 0 1 4.5-3 2.5 2.5 0 0 1 0 5" />
    </svg>
);


// Mock data for products
const productsData = [
    {
        id: 1, name: 'Cotton T-Shirt', price: 25.00, quantity: 2,
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        carbonEmission: 7, rating: 3,
        alternatives: [
            { id: 101, name: 'Organic Cotton T-Shirt', carbonEmission: 4, image: 'https://www.oowia.com/wp-content/uploads/2021/05/organic-cotton-lycra-tshirts-for-men-oowia-india-scaled.jpg.webp' },
            { id: 102, name: 'Recycled Fabric T-Shirt', carbonEmission: 3, image: 'https://m.media-amazon.com/images/I/71oK5xKcB6L._AC_UY1100_.jpg' },
        ]
    },
    {
        id: 2, name: 'Leather Boots', price: 150.00, quantity: 1,
        image: 'https://assets.ajio.com/medias/sys_master/root/20240209/G9Tc/65c53e6e16fd2c6e6ae93e1e/-473Wx593H-467056133-black-MODEL.jpg',
        carbonEmission: 50, rating: 2,
        alternatives: [
            { id: 201, name: 'Vegan Leather Boots', carbonEmission: 20, image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/22604924/2023/4/1/f02587c9-b6c1-4cde-8bc6-d5d2d522be781680332229528DelizeBlackwomenveganDerbyankleboots1.jpg' },
            { id: 202, name: 'Canvas Sneakers', carbonEmission: 15, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80' },
        ]
    },
    {
        id: 3, name: 'Plastic Water Bottle (500ml)', price: 1.50, quantity: 5,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNYfDk4cQf55hAoTRMuYqLLeSONhFzCi81Hg&s',
        carbonEmission: 0.5, rating: 1,
        alternatives: [
            { id: 301, name: 'Reusable Steel Bottle', carbonEmission: 0.1, image: 'https://brownliving.in/cdn/shop/files/sustainable-bambooshell-leak-proof-steel-bottle-by-organic-b-at-brownliving-932337.jpg?v=1731608235' },
            { id: 302, name: 'Glass Bottle with Sleeve', carbonEmission: 0.2, image: 'https://www.glasafe.com/cdn/shop/files/hzjqpehrzldyvt8glfmo.webp?v=1746174149' },
        ]
    }
];

// Mock data for leaderboard
const initialLeaderboardData = [
    { id: 'jane-doe', name: 'ChulBul Pandey', savings: 150.75 },
    { id: 'alex-smith', name: 'Selmon Bhoi', savings: 125.50 },
    { id: 'sam-wilson', name: 'Captain America', savings: 99.80 },
    { id: 'eco-friendly-chris', name: 'Sydney Sweeney', savings: 75.20 },
];

const AmazonNavbar = ({ cartItemCount }) => (
    <nav className="bg-[#131921] text-white">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
                <h1 className="text-2xl font-bold">EcoCart</h1>
                <div className="hidden md:flex items-center space-x-1">
                    <MapPin className="w-5 h-5" />
                    <div>
                        <p className="text-xs text-slate-300">Deliver to</p>
                        <p className="text-sm font-bold">Nitin</p>
                    </div>
                </div>
            </div>
            <div className="flex-grow mx-4 hidden md:flex">
                <div className="flex w-full">
                    <button className="bg-slate-200 text-slate-800 px-3 rounded-l-md text-sm flex items-center">
                        All <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                    <input type="text" placeholder="Search EcoCart.in" className="w-full p-2 text-slate-900 focus:outline-none" />
                    <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 p-2 rounded-r-md">
                        <Search className="w-6 h-6" />
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                 <div className="hidden md:flex items-center space-x-2">
                    <span role="img" aria-label="Indian Flag">🇮🇳</span>
                    <span className="font-bold">EN</span>
                </div>
                <div className="hidden md:block">
                    <p className="text-xs">Hello, Nitin</p>
                    <p className="font-bold text-sm">Account & Lists</p>
                </div>
                <div className="hidden md:block">
                    <p className="text-xs">Returns</p>
                    <p className="font-bold text-sm">& Orders</p>
                </div>
                <div className="relative flex items-center space-x-1">
                    {cartItemCount > 0 && (
                        <span className="absolute -top-1 left-4 bg-amber-400 text-slate-900 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartItemCount}
                        </span>
                    )}
                    <ShoppingCart className="w-8 h-8"/>
                    <span className="font-bold">Cart</span>
                </div>
            </div>
        </div>
        <div className="bg-[#232f3e] text-white text-sm">
             <div className="container mx-auto px-4 flex items-center space-x-4 h-10 overflow-x-auto">
                 {['All', 'Fresh', 'Gift Cards', 'Sell', 'Amazon Pay', 'Buy Again', 'Health', 'Home Improvement'].map(item => (
                     <a href="#" key={item} className="py-2 px-2 whitespace-nowrap hover:border-white hover:border rounded-sm">{item}</a>
                 ))}
             </div>
        </div>
    </nav>
);

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`}/>
    ))}
  </div>
);

const AlternativeCard = ({ alt, originalEmission, onSwitch }) => {
    const emissionDifference = originalEmission - alt.carbonEmission;
    return (
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex flex-col sm:flex-row items-center gap-3 text-left w-full mt-2 transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
            <img src={alt.image} alt={alt.name} className="w-16 h-16 object-cover rounded-md flex-shrink-0" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/64x64/CCCCCC/FFFFFF?text=Image'; }} />
            <div className="flex-grow">
                <p className="font-semibold text-emerald-900">{alt.name}</p>
                <div className="flex items-center gap-2 text-sm text-emerald-700">
                    <Leaf className="w-3 h-3" />
                    <span>{alt.carbonEmission.toFixed(2)} kg CO₂e</span>
                    <span className="text-rose-500 font-medium bg-rose-100 px-1.5 py-0.5 rounded-full flex items-center text-xs">
                        <TrendingDown className="w-3 h-3 mr-1" />- {emissionDifference.toFixed(2)}kg
                    </span>
                </div>
            </div>
            <button onClick={onSwitch} className="w-full sm:w-auto text-sm bg-emerald-600 text-white py-1 px-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors">
                <Replace className="w-4 h-4" /> Switch
            </button>
        </div>
    );
};

const CartItem = ({ item, onQuantityChange, onSwitchAlternative }) => (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-4 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-48 md:w-32 md:h-32 object-cover rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/128x128/CCCCCC/FFFFFF?text=Image+Not+Found'; }} />
        </div>
      <div className="flex-grow flex flex-col justify-between">
        <div>
            <h3 className="text-lg font-bold text-slate-800">{item.name}</h3>
            <p className="text-slate-500 text-md font-semibold">${item.price.toFixed(2)}</p>
             <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center text-sm text-rose-600 font-medium">
                    <Leaf className="w-4 h-4 mr-1"/> Carbon: {item.carbonEmission.toFixed(2)} kg CO₂e
                </div>
                <div className="flex items-center">
                  <StarRating rating={item.rating} />
                </div>
            </div>
        </div>
        <div className="flex items-center mt-4">
            <span className="text-slate-600 mr-3 font-medium">Quantity:</span>
            <div className="flex items-center border border-slate-200 rounded-lg">
                <button onClick={() => onQuantityChange(item.id, item.quantity - 1)} className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-l-md transition-colors">-</button>
                <span className="px-4 py-1 font-semibold text-emerald-700">{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.id, item.quantity + 1)} className="px-3 py-1 text-slate-600 hover:bg-slate-100 rounded-r-md transition-colors">+</button>
            </div>
        </div>
      </div>
      {item.alternatives.length > 0 && (
        <div className="md:w-2/5 mt-4 md:mt-0 md:pl-6 md:border-l border-slate-200">
            <h4 className="font-semibold text-emerald-800 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" /> Greener Alternatives
            </h4>
            <div className="mt-2 space-y-2">
                {item.alternatives.map(alt => (
                    <AlternativeCard key={alt.id} alt={alt} originalEmission={item.carbonEmission} onSwitch={() => onSwitchAlternative(item.id, alt)} />
                ))}
            </div>
        </div>
      )}
    </div>
);

const LeaderboardChart = ({ data }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-emerald-600">
            <BarChartIcon className="w-7 h-7 mr-3" /> Leaderboard Rankings
        </h2>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#475569', fontSize: 12 }} />
                    <Tooltip
                        cursor={{ fill: 'rgba(236, 253, 245, 0.5)' }}
                        contentStyle={{
                            backgroundColor: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.75rem',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                    />
                    <Legend wrapperStyle={{ color: '#334155', paddingTop: '10px' }} />
                    <Bar dataKey="savings" fill="#10b981" name="CO₂ Saved (kg)" barSize={30} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);


const Leaderboard = ({ leaderboard }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-amber-500">
            <Trophy className="w-7 h-7 mr-3" /> CO₂ Savers Leaderboard
        </h2>
        <ul className="space-y-3">
            {leaderboard.map((user, index) => (
                <li key={user.id} className={`p-3 rounded-lg flex items-center justify-between transition-all ${index === 0 ? 'bg-amber-100 border border-amber-300 transform scale-105' : 'bg-slate-50'}`}>
                    <div className="flex items-center">
                        <span className="font-bold text-slate-600 w-8">{index + 1}.</span>
                        <span className="font-semibold text-slate-800">{user.name}</span>
                        {index === 0 && (
                           <div className="ml-3 flex items-center gap-1 text-xs bg-amber-500 text-white font-bold py-1 px-2 rounded-full">
                               <Gift className="w-4 h-4" /> Prime Pass
                           </div>
                        )}
                    </div>
                    <span className="font-bold text-emerald-600">{user.savings.toFixed(2)} kg saved</span>
                </li>
            ))}
        </ul>
    </div>
);

// --- NEW: Gemini-Powered Eco Tip Component ---
const EcoTipGenerator = ({ cartItems, onGenerateTip, tip, isLoading, error }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-emerald-800">
             <Sparkles className="w-7 h-7 mr-3 text-emerald-500"/> Smart Eco-Tip
        </h2>
        <p className="text-sm text-slate-500 mb-4">
            Get a personalized sustainability tip from our AI based on the items in your cart.
        </p>
        <button 
            onClick={onGenerateTip}
            disabled={isLoading || cartItems.length === 0}
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 px-4 rounded-lg font-semibold text-md hover:bg-emerald-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Generating...
                </>
            ) : (
                "✨ Generate My Tip"
            )}
        </button>
        {cartItems.length === 0 && (
            <p className="text-xs text-center text-slate-500 mt-2">Add items to your cart to get a tip.</p>
        )}
        {tip && !isLoading && (
            <blockquote className="mt-4 p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 italic animate-fade-in">
                {tip}
            </blockquote>
        )}
        {error && !isLoading &&(
            <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg animate-fade-in">
                <p className="font-semibold">Oops!</p>
                <p className="text-sm">{error}</p>
            </div>
        )}
    </div>
);


export default function App() {
  const [cartItems, setCartItems] = useState(productsData);
  const [ecoTip, setEcoTip] = useState('');
  const [isGeneratingTip, setIsGeneratingTip] = useState(false);
  const [tipError, setTipError] = useState('');
  const [usePaperPackaging, setUsePaperPackaging] = useState(false);
  const [clubDelivery, setClubDelivery] = useState(false);
  const [userCO2Savings, setUserCO2Savings] = useState(0);
  const [leaderboardData, setLeaderboardData] = useState(initialLeaderboardData);

  const PAPER_PACKAGING_COST = 2.50;
  const PAPER_PACKAGING_SAVINGS = 1.5;
  const DELIVERY_CLUBBING_SAVINGS = 2.5;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQuantity } : item));
    } else {
      setCartItems(cartItems.filter(item => item.id !== id));
    }
  };

  const handleSwitchAlternative = (oldItemId, alternative) => {
    const oldItem = cartItems.find(item => item.id === oldItemId);
    if (!oldItem) return;

    const savings = (oldItem.carbonEmission - alternative.carbonEmission) * oldItem.quantity;
    const newTotalSavings = userCO2Savings + savings;
    setUserCO2Savings(newTotalSavings);
    
    const currentUser = { id: 'current-user', name: 'You (Nitin)', savings: newTotalSavings };
    const otherUsers = leaderboardData.filter(u => u.id !== 'current-user');
    const updatedLeaderboard = [...otherUsers, currentUser].sort((a, b) => b.savings - a.savings);
    setLeaderboardData(updatedLeaderboard);

    const newItem = {
        ...oldItem,
        id: `${oldItem.id}-${alternative.id}`, 
        name: alternative.name,
        carbonEmission: alternative.carbonEmission,
        rating: 5,
        image: alternative.image,
        alternatives: [], 
    };
    setCartItems(cartItems.map(item => item.id === oldItemId ? newItem : item));
  };
  
  const { totalCarbon, subtotal, finalTotal } = useMemo(() => {
    const baseSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let baseCarbon = cartItems.reduce((acc, item) => acc + item.carbonEmission * item.quantity, 0);

    let finalTotalValue = baseSubtotal;
    if (usePaperPackaging) {
      finalTotalValue += PAPER_PACKAGING_COST;
      baseCarbon -= PAPER_PACKAGING_SAVINGS;
    }
    if (clubDelivery) {
        baseCarbon -= DELIVERY_CLUBBING_SAVINGS;
    }

    return { 
        subtotal: baseSubtotal, 
        totalCarbon: baseCarbon < 0 ? 0 : baseCarbon,
        finalTotal: finalTotalValue
    };
  }, [cartItems, usePaperPackaging, clubDelivery]);

  const handleClubDeliveryToggle = () => {
      const newClubDeliveryState = !clubDelivery;
      setClubDelivery(newClubDeliveryState);

      const savingsChange = newClubDeliveryState ? DELIVERY_CLUBBING_SAVINGS : -DELIVERY_CLUBBING_SAVINGS;
      const newTotalSavings = userCO2Savings + savingsChange;
      setUserCO2Savings(newTotalSavings);

      const currentUser = { id: 'current-user', name: 'You (Nitin)', savings: newTotalSavings };
      const otherUsers = leaderboardData.filter(u => u.id !== 'current-user');
      const updatedLeaderboard = [...otherUsers, currentUser].sort((a, b) => b.savings - a.savings);
      setLeaderboardData(updatedLeaderboard);
  };

  // --- NEW: Gemini API Call to Generate Eco Tip ---
  const handleGenerateTip = async () => {
    if (cartItems.length === 0) return;
    
    setIsGeneratingTip(true);
    setEcoTip('');
    setTipError('');
    
    const itemNames = cartItems.map(item => item.name).join(', ');
    const prompt = `Based on a shopping cart containing: ${itemNames}, provide one short, actionable, and encouraging eco-friendly tip for the shopper. The tip should be creative and directly related to the items if possible. Make it sound helpful and not preachy.`;

    try {
        const chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
        const payload = { contents: chatHistory };
        const apiKey = ""; // API key will be injected by the environment
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            setEcoTip(text);
        } else {
            throw new Error("Couldn't generate a tip. The model returned an empty response.");
        }

    } catch (error) {
        console.error("Gemini API call failed:", error);
        setTipError("Sorry, we couldn't generate a tip right now. Please try again later.");
    } finally {
        setIsGeneratingTip(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-700">
      <AmazonNavbar cartItemCount={cartItems.length} />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <main className="lg:col-span-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Your Items ({cartItems.length})</h2>
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <CartItem key={item.id} item={item} onQuantityChange={handleQuantityChange} onSwitchAlternative={handleSwitchAlternative} />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                            <ShoppingCart className="w-16 h-16 mx-auto text-slate-300" />
                            <h3 className="mt-4 text-xl font-semibold text-slate-700">Your EcoCart is empty.</h3>
                            <p className="mt-2 text-slate-500">Add items to see them here.</p>
                        </div>
                    )}
                </div>
            </main>

            <aside className="sticky top-8 space-y-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/50">
                    <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 pb-4 text-slate-800">Order Summary</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between text-slate-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors" onClick={() => setUsePaperPackaging(!usePaperPackaging)}>
                            <div className="flex items-center">
                                <Package className="w-5 h-5 mr-3 text-emerald-600"/>
                                <label className="text-slate-700 font-medium cursor-pointer">Eco Paper Packaging</label>
                            </div>
                            <input type="checkbox" checked={usePaperPackaging} onChange={(e) => { e.stopPropagation(); setUsePaperPackaging(!usePaperPackaging); }} className="form-checkbox h-5 w-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"/>
                        </div>
                        {usePaperPackaging && (
                            <div className="flex justify-between pl-5 text-slate-600 animate-fade-in">
                                <span>Packaging Fee</span>
                                <span className="font-semibold text-slate-800">+${PAPER_PACKAGING_COST.toFixed(2)}</span>
                            </div>
                        )}
                        
                        <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                            <div className="flex items-center justify-between cursor-pointer" onClick={handleClubDeliveryToggle}>
                                <div className="flex items-center">
                                    <Users className="w-5 h-5 mr-3 text-emerald-600"/>
                                    <label className="text-slate-700 font-medium cursor-pointer">Club with Nearby Orders</label>
                                </div>
                                <input type="checkbox" checked={clubDelivery} readOnly className="form-checkbox h-5 w-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"/>
                            </div>
                             <p className="text-xs text-emerald-700 mt-2">Save an extra {DELIVERY_CLUBBING_SAVINGS.toFixed(2)}kg of CO₂ and earn points by sharing a delivery route!</p>
                        </div>

                        <div className="flex justify-between items-center text-rose-600 pt-3 border-t mt-3">
                            <span className="font-bold flex items-center"><Leaf className="w-5 h-5 mr-2"/>Total Carbon</span>
                            <span className="font-extrabold">{totalCarbon.toFixed(2)} kg CO₂e</span>
                        </div>
                        <div className="flex justify-between items-center text-2xl font-bold pt-3 border-t mt-3 text-slate-800">
                            <span>Total</span>
                            <span>${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    
                    <button className="w-full mt-6 bg-emerald-800 text-white py-3 rounded-lg font-semibold text-lg hover:bg-emerald-900 transition-colors">
                        Proceed to Checkout
                    </button>
                    <p className="text-xs text-slate-500 mt-4 flex items-start">
                        <Info className="w-5 h-5 mr-1.5 flex-shrink-0" />
                        Carbon emissions are estimates and savings are points for our leaderboard challenge.
                    </p>
                </div>
                {/* --- NEW: Gemini Feature Added Here --- */}
                <EcoTipGenerator 
                    cartItems={cartItems}
                    onGenerateTip={handleGenerateTip}
                    tip={ecoTip}
                    isLoading={isGeneratingTip}
                    error={tipError}
                />
                <LeaderboardChart data={leaderboardData} />
                <Leaderboard leaderboard={leaderboardData} />
            </aside>
        </div>
      </div>
    </div>
  );
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fade-in {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
  }
`;
document.head.append(style);
