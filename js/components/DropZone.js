import { $, setError } from '../state';

export class DropZone {
    bind(onFile, onRoute) {
        const zone = $('uploadView');

        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('!border-orange-600', '!bg-orange-500/5');
        });

        zone.addEventListener('dragleave', () => {
            zone.classList.remove('!border-orange-600', '!bg-orange-500/5');
        });

        zone.addEventListener('click', (e) => {
            if (e.target.closest('label') || e.target.id === 'fileInput') {
                return;
            }
            $('fileInput').click();
        });

        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('!border-orange-600', '!bg-orange-500/5');
            const file = e.dataTransfer.files[0];
            if (file && file.name.endsWith('.gpx')) {
                onFile(file);
            } else {
                setError('Please drop a .gpx file');
            }
        });

        $('fileInput').addEventListener('change', (e) => {
            if (e.target.files[0]) {
                onFile(e.target.files[0]);
            }
        });

        $('demoLink').addEventListener('click', async (e) => {
            e.stopPropagation();
            const res = await fetch('./assets/tour-of-flanders.gpx');
            const blob = await res.blob();
            const text = await blob.text();
            onRoute('tour-of-flanders.gpx', { type: 'gpx', data: text }, { persist: false });
        });
    }

    showLastRoute(name, route, onRoute) {
        const btn = $('lastGpxLink');
        $('lastGpxName').textContent = name;
        $('lastGpxContainer').classList.remove('hidden');
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            onRoute(name, route);
        });
    }
}
