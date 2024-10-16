import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Map from '../components/Map';
import SearchForm from '../components/SearchForm';
import ReportList from '../components/ReportList';
import Footer from '../components/Footer';

function Home() {
    const [reports, setReports] = useState([
        { id: 1, description: "Accidente en la esquina", address: "Calle Falsa 123" },
        { id: 2, description: "Semáforo roto", address: "Avenida Siempre Viva 742" }
    ]);

    return (
        <div>
            <Navbar />
            <main>
                <div style={{ display: 'flex' }}>
                    <div style={{ width: '60%' }}>
                        <Map />
                    </div>
                    <div style={{ width: '40%' }}>
                        <SearchForm />
                        <button onClick={() => alert("Abrir formulario de reporte")}>
                            Reportar incidente
                        </button>
                        <ReportList reports={reports} />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
