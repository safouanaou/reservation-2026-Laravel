import { Link, usePage } from '@inertiajs/react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../css/layouts/dashboard.css';

export default function DashboardLayout({ children }) {
    const { url } = usePage();
    const isArtistsPage = url.startsWith('/artist');

    return (
        <div className="dashboard">
            <aside className="dashboard-sidebar">
                <Link href="/artist" className="dashboard-brand" aria-label="Reservations home">
                    <i className="bi bi-ticket-perforated" aria-hidden="true" />
                </Link>

                <nav aria-label="Main navigation">
                    <Link
                        href="/artist"
                        className={`dashboard-nav-item${isArtistsPage ? ' active' : ''}`}
                        aria-current={isArtistsPage ? 'page' : undefined}
                    >
                        <i className="bi bi-people" aria-hidden="true" />
                        <span>Artists</span>
                    </Link>
                </nav>
            </aside>

            <div className="dashboard-main">
                <header className="dashboard-header">
                    <span className="dashboard-app-mark">
                        <i className="bi bi-ticket-perforated" aria-hidden="true" />
                    </span>
                    <span>Reservations Management</span>
                </header>

                <main className="dashboard-content">
                    <div className="dashboard-panel">{children}</div>
                </main>
            </div>
        </div>
    );
}
