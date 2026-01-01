import React, { useState, Suspense } from 'react';
import Home from './Home';
import AnimationTuner from './CardAnimationTuner';
import UploadSVG from './UploadSVG';
const SvgModifier = React.lazy(() => import('./SvgModifier.tsx'));

type Project = {
    name: string;
    collapsed: string; // svg content
    expanded: string; // svg content
};

function App() {
    const [route, setRoute] = useState('/');
    const [projects, setProjects] = useState<Record<string, Project>>({});

    const navigate = (path: string) => setRoute(path);

    const addProject = (slug: string, project: Project) => {
        setProjects((prev) => ({ ...prev, [slug]: project }));
        setRoute(`/${slug}-modifier`);
    };

    // detect dynamic modifier route
    const isModifierRoute = route.endsWith('-modifier');
    const modifierSlug = isModifierRoute ? route.replace(/^-?\//, '').replace('-modifier', '') : null;

    return (
        <div className="min-h-screen bg-slate-900 text-slate-200">
            <header className="bg-slate-950/10 border-b border-slate-800">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-md bg-cyan-600 flex items-center justify-center font-black">CA</div>
                        <div>
                            <div className="text-lg font-extrabold">Component Animator</div>
                            <div className="text-xs text-slate-400">Animate & export SVG components</div>
                        </div>
                    </div>

                    <nav className="flex items-center space-x-3">
                        <button onClick={() => navigate('/')} className={`px-3 py-2 rounded text-sm ${route === '/' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>Home</button>
                        <button onClick={() => navigate('/card-animator')} className={`px-3 py-2 rounded text-sm ${route === '/card-animator' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>CardAnimator</button>
                        <button onClick={() => navigate('/upload-svg')} className={`px-3 py-2 rounded text-sm ${route === '/upload-svg' ? 'bg-slate-800' : 'hover:bg-slate-800'}`}>Upload SVG</button>
                    </nav>
                </div>
            </header>

            <main>
                {route === '/' && <Home navigate={navigate} />}
                {route === '/card-animator' && <AnimationTuner />}
                {route === '/upload-svg' && <UploadSVG onCreate={addProject} />}

                {isModifierRoute && modifierSlug && projects[modifierSlug] && (
                    <Suspense fallback={<div className="max-w-6xl mx-auto px-6 py-12">Loading modifier...</div>}>
                        <SvgModifier project={projects[modifierSlug]} navigate={navigate} slug={modifierSlug} />
                    </Suspense>
                )}

                {isModifierRoute && modifierSlug && !projects[modifierSlug] && (
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-2xl font-bold">Project not found</h2>
                        <p className="text-slate-400 mt-2">The requested modifier does not exist. Upload an SVG project first.</p>
                        <div className="mt-6">
                            <button onClick={() => navigate('/upload-svg')} className="px-4 py-2 bg-cyan-600 text-white rounded">Upload SVG</button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
