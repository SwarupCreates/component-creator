import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

type Project = {
    name: string;
    collapsed: string;
    expanded: string;
};

type Props = {
    project: Project;
    slug: string;
    navigate: (path: string) => void;
};

// parse svg string into an object with groups keyed by id
const parseSvg = (svgString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, 'image/svg+xml');
    const svgEl = doc.querySelector('svg');
    const viewBox = svgEl?.getAttribute('viewBox') || undefined;
    const width = svgEl?.getAttribute('width') || undefined;
    const height = svgEl?.getAttribute('height') || undefined;

    const groups = Array.from(doc.querySelectorAll('g[id]')).map(g => ({ id: g.getAttribute('id') || '', inner: g.innerHTML }));
    return { viewBox, width, height, groups };
};

const SvgModifier: React.FC<Props> = ({ project, slug, navigate }) => {
    const collapsedParsed = useMemo(() => parseSvg(project.collapsed), [project.collapsed]);
    const expandedParsed = useMemo(() => parseSvg(project.expanded), [project.expanded]);

    const ids = useMemo(() => {
        const set = new Set<string>();
        collapsedParsed.groups.forEach(g => g.id && set.add(g.id));
        expandedParsed.groups.forEach(g => g.id && set.add(g.id));
        return Array.from(set);
    }, [collapsedParsed, expandedParsed]);

    type VariantState = { x: number; y: number; rotate: number; scale: number };
    type VariantsMap = Record<string, { collapsed: VariantState; expanded: VariantState }>;

    const initialVariants = useMemo((): VariantsMap => {
        const out: VariantsMap = {} as VariantsMap;
        ids.forEach(id => {
            out[id] = { collapsed: { x: 0, y: 0, rotate: 0, scale: 1 }, expanded: { x: 0, y: 0, rotate: 0, scale: 1 } };
        });
        return out;
    }, [ids]);

    const [variants, setVariants] = useState<VariantsMap>(initialVariants);

    const handleValueChange = (id: string, state: 'collapsed' | 'expanded', prop: keyof VariantState, value: number) => {
        setVariants(prev => ({ ...prev, [id]: { ...prev[id], [state]: { ...prev[id][state], [prop]: value } } }));
    };

    const animationTransition = { type: 'spring', stiffness: 400, damping: 35 } as const;

    // helpers to lookup group inner HTML quickly
    const collapsedMap = useMemo(() => Object.fromEntries(collapsedParsed.groups.map(g => [g.id, g.inner])), [collapsedParsed]);
    const expandedMap = useMemo(() => Object.fromEntries(expandedParsed.groups.map(g => [g.id, g.inner])), [expandedParsed]);

    const collapsedOpacityVariants = {
        collapsed: { opacity: 1, transition: { duration: 0.2 } },
        expanded: { opacity: 0, transition: { duration: 0.15 } }
    };
    const expandedOpacityVariants = {
        collapsed: { opacity: 0, transition: { duration: 0.15 } },
        expanded: { opacity: 1, transition: { duration: 0.2 } }
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full md:w-[420px] p-6 space-y-6 bg-slate-900 border-r border-slate-800 overflow-y-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">{project.name.toUpperCase()} — Modifier</h2>
                        <p className="text-sm text-slate-400">Adjust group transforms for collapsed and expanded states</p>
                    </div>
                    <div>
                        <button onClick={() => navigate('/')} className="text-xs px-3 py-2 bg-slate-800 rounded">Back</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {ids.map(id => (
                        <div key={id} className="p-3 bg-slate-800/60 rounded">
                            <div className="flex items-center justify-between">
                                <div className="font-medium">{id}</div>
                                <div className="text-xs text-slate-400">group</div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 mt-3">
                                <div>
                                    <div className="text-[11px] font-bold text-cyan-400 uppercase mb-2">Collapsed</div>
                                    <label className="text-xs block">X <span className="text-xs text-slate-400">{variants[id].collapsed.x}</span></label>
                                    <input type="range" min={-200} max={200} value={variants[id].collapsed.x} onChange={(e) => handleValueChange(id, 'collapsed', 'x', parseFloat(e.target.value))} />
                                    <label className="text-xs block mt-2">Y <span className="text-xs text-slate-400">{variants[id].collapsed.y}</span></label>
                                    <input type="range" min={-200} max={200} value={variants[id].collapsed.y} onChange={(e) => handleValueChange(id, 'collapsed', 'y', parseFloat(e.target.value))} />
                                    <label className="text-xs block mt-2">Rotate <span className="text-xs text-slate-400">{variants[id].collapsed.rotate}</span></label>
                                    <input type="range" min={-180} max={180} step={0.1} value={variants[id].collapsed.rotate} onChange={(e) => handleValueChange(id, 'collapsed', 'rotate', parseFloat(e.target.value))} />
                                    <label className="text-xs block mt-2">Scale <span className="text-xs text-slate-400">{variants[id].collapsed.scale}</span></label>
                                    <input type="range" min={0.1} max={2} step={0.01} value={variants[id].collapsed.scale} onChange={(e) => handleValueChange(id, 'collapsed', 'scale', parseFloat(e.target.value))} />
                                </div>

                                <div>
                                    <div className="text-[11px] font-bold text-teal-400 uppercase mb-2">Expanded</div>
                                    <label className="text-xs block">X <span className="text-xs text-slate-400">{variants[id].expanded.x}</span></label>
                                    <input type="range" min={-200} max={200} value={variants[id].expanded.x} onChange={(e) => handleValueChange(id, 'expanded', 'x', parseFloat(e.target.value))} />
                                    <label className="text-xs block mt-2">Y <span className="text-xs text-slate-400">{variants[id].expanded.y}</span></label>
                                    <input type="range" min={-200} max={200} value={variants[id].expanded.y} onChange={(e) => handleValueChange(id, 'expanded', 'y', parseFloat(e.target.value))} />
                                    <label className="text-xs block mt-2">Rotate <span className="text-xs text-slate-400">{variants[id].expanded.rotate}</span></label>
                                    <input type="range" min={-180} max={180} step={0.1} value={variants[id].expanded.rotate} onChange={(e) => handleValueChange(id, 'expanded', 'rotate', parseFloat(e.target.value))} />
                                    <label className="text-xs block mt-2">Scale <span className="text-xs text-slate-400">{variants[id].expanded.scale}</span></label>
                                    <input type="range" min={0.1} max={2} step={0.01} value={variants[id].expanded.scale} onChange={(e) => handleValueChange(id, 'expanded', 'scale', parseFloat(e.target.value))} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 bg-[#020617] p-8 flex items-center justify-center">
                <div className="w-[520px] h-[320px] bg-[radial-gradient(circle_at_2px_2px,_#1e293b_1px,_transparent_0)] bg-size[32px_32px] flex items-center justify-center">
                    <motion.div initial="collapsed" animate="collapsed" whileHover="expanded" className="p-4">
                        <svg viewBox={collapsedParsed.viewBox || expandedParsed.viewBox || '0 0 236 123'} width={460} height={240} xmlns="http://www.w3.org/2000/svg">
                            {ids.map(id => {
                                const collapsedInner = collapsedMap[id] || '';
                                const expandedInner = expandedMap[id] || '';
                                const transformVariants = {
                                    collapsed: { x: variants[id].collapsed.x, y: variants[id].collapsed.y, rotate: variants[id].collapsed.rotate, scale: variants[id].collapsed.scale },
                                    expanded: { x: variants[id].expanded.x, y: variants[id].expanded.y, rotate: variants[id].expanded.rotate, scale: variants[id].expanded.scale }
                                };

                                return (
                                    <g key={id}>
                                        <motion.g variants={transformVariants} transition={animationTransition}>
                                            <motion.g key={id + '-collapsed'} variants={collapsedOpacityVariants} dangerouslySetInnerHTML={{ __html: collapsedInner }} />
                                            <motion.g key={id + '-expanded'} variants={expandedOpacityVariants} dangerouslySetInnerHTML={{ __html: expandedInner }} />
                                        </motion.g>
                                    </g>
                                );
                            })}
                        </svg>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SvgModifier;
