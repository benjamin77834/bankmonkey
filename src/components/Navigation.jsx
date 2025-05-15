import React from 'react';
import { Menubar } from 'primereact/menubar';

const Navigation = () => {
    const items = [
        {
            label: 'Inicio',
            icon: 'pi pi-home',
            command: () => { window.location.href = '/'; }
        },
        {
            label: 'Servicios',
            icon: 'pi pi-briefcase',
            items: [
                {
                    label: 'Consultoría',
                    icon: 'pi pi-fw pi-cog',
                    command: () => { window.location.href = '/consultoria'; }
                },
                {
                    label: 'Desarrollo',
                    icon: 'pi pi-fw pi-code',
                    command: () => { window.location.href = '/desarrollo'; }
                }
            ]
        },
        {
            label: 'Contacto',
            icon: 'pi pi-envelope',
            command: () => { window.location.href = '/contacto'; }
        }
    ];

    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
};

export default Navigation;
