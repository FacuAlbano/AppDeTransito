import React from 'react';

function ReportList({ reports }) {
    return (
        <div className="reports-list">
            <h3>Reportes activos cerca de tu ubicación</h3>
            <ul>
                {reports.map(report => (
                    <li key={report.id}>
                        {report.description} - {report.address}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ReportList;
