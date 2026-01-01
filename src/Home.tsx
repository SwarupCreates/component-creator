import React, { useEffect } from 'react';

type HomeProps = {
    navigate: (path: string) => void;
};

const Home: React.FC<HomeProps> = ({ navigate }) => {
    useEffect(() => {
        document.title = 'Component Animator';
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-[#020617] to-slate-950 text-slate-200">
            <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-cyan-600 flex items-center justify-center text-lg font-black">CA</div>
                    <div>
                        <h1 className="text-2xl font-extrabold">Component Animator</h1>
                        <p className="text-sm text-slate-400">Animate and export SVG component variants</p>
                    </div>
                </div>

                <nav className="hidden md:flex items-center space-x-4">
                    <button onClick={() => navigate('/')} className="text-sm font-medium px-3 py-2 rounded hover:bg-slate-800">Home</button>
                    <button onClick={() => navigate('/card-animator')} className="text-sm font-medium px-3 py-2 rounded hover:bg-slate-800">CardAnimator</button>
                    <button onClick={() => navigate('/custom-animator')} className="text-sm font-medium px-3 py-2 rounded hover:bg-slate-800">CustomAnimator</button>
                </nav>
            </header>

            <main className="max-w-6xl mx-auto px-6 pb-16">
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <article className="group bg-slate-800/60 border border-slate-700 rounded-xl p-6 hover:scale-105 transform transition cursor-pointer" onClick={() => navigate('/card-animator')}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Card Animator</h3>
                            <div className="text-xs text-slate-400">Start tuning</div>
                        </div>
                        <p className="mt-3 text-sm text-slate-400">Tune card groups (GCP / AWS / Azure) and export Framer Motion variants.</p>
                        <div className="mt-6 h-28 bg-gradient-to-br from-slate-900 to-slate-800 rounded-md border border-slate-700 flex items-center justify-center text-slate-500">Live preview</div>
                    </article>

                    <article className="group bg-slate-800/60 border border-slate-700 rounded-xl p-6 hover:scale-105 transform transition cursor-pointer" onClick={() => navigate('/custom-animator')}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Custom Animator</h3>
                            <div className="text-xs text-slate-400">Upload SVG</div>
                        </div>
                        <p className="mt-3 text-sm text-slate-400">Upload your SVG and generate controls automatically for groups in the file.</p>
                        <div className="mt-6 h-28 bg-gradient-to-br from-slate-900 to-slate-800 rounded-md border border-slate-700 flex items-center justify-center text-slate-500">Upload SVG</div>
                    </article>

                    <article className="group bg-slate-800/60 border border-slate-700 rounded-xl p-6 hover:scale-105 transform transition cursor-pointer" onClick={() => navigate('/card-animator')}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold">Templates & Presets</h3>
                            <div className="text-xs text-slate-400">Browse</div>
                        </div>
                        <p className="mt-3 text-sm text-slate-400">Save and load presets for quick iteration workflows.</p>
                        <div className="mt-6 h-28 bg-gradient-to-br from-slate-900 to-slate-800 rounded-md border border-slate-700 flex items-center justify-center text-slate-500">Explore</div>
                    </article>
                </section>

                <section className="mt-10">
                    <h4 className="text-sm uppercase text-slate-400 font-medium mb-4">Quick Links</h4>
                    <div className="flex items-center space-x-3">
                        <button onClick={() => navigate('/card-animator')} className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm">Open Card Animator</button>
                        <button onClick={() => navigate('/custom-animator')} className="px-4 py-2 bg-slate-700 text-slate-200 rounded-lg text-sm">Open Custom Animator</button>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
