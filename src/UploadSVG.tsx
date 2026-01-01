import React, { useRef } from 'react';

type Props = {
    onCreate: (slug: string, project: { name: string; collapsed: string; expanded: string }) => void;
};

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const UploadSVG: React.FC<Props> = ({ onCreate }) => {
    const collapsedRef = useRef<HTMLInputElement | null>(null);
    const expandedRef = useRef<HTMLInputElement | null>(null);

    const handleCreate = async () => {
        const collapsedFile = collapsedRef.current?.files?.[0];
        const expandedFile = expandedRef.current?.files?.[0];
        if (!collapsedFile || !expandedFile) {
            alert('Please select both Collapsed and Expanded SVG files.');
            return;
        }

        const read = (file: File) => new Promise<string>((res, rej) => {
            const reader = new FileReader();
            reader.onload = () => res(String(reader.result || ''));
            reader.onerror = rej;
            reader.readAsText(file);
        });

        const [collapsedSvg, expandedSvg] = await Promise.all([read(collapsedFile), read(expandedFile)]);
        const name = collapsedFile.name.replace(/\.svg$/i, '');
        const slug = slugify(name);

        onCreate(slug, { name, collapsed: collapsedSvg, expanded: expandedSvg });
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold mb-4">Upload SVG Pair</h2>
            <p className="text-slate-400 mb-6">Upload two SVG files representing the Collapsed and Expanded states. The app will create a modifier project from them.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                    <div className="text-sm font-medium mb-1">Collapsed SVG</div>
                    <input ref={collapsedRef} type="file" accept=".svg" className="block w-full text-sm text-slate-400" />
                </label>
                <label className="block">
                    <div className="text-sm font-medium mb-1">Expanded SVG</div>
                    <input ref={expandedRef} type="file" accept=".svg" className="block w-full text-sm text-slate-400" />
                </label>
            </div>

            <div className="mt-6">
                <button onClick={handleCreate} className="px-4 py-2 bg-cyan-600 text-white rounded">Create Modifier</button>
            </div>
        </div>
    );
};

export default UploadSVG;
