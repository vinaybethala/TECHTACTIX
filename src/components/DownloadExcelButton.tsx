'use client';

import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

interface DownloadExcelButtonProps {
  registrations: any[];
}

export default function DownloadExcelButton({ registrations }: DownloadExcelButtonProps) {
  const handleDownload = () => {
    // Transform registrations to a flat format for Excel
    const data = registrations.map((reg) => ({
      'Registration ID': reg.registrationId,
      'Date': new Date(reg.createdAt).toLocaleDateString('en-GB'),
      'Total Fee': reg.totalFee,
      'Payment Status': reg.paymentStatus || 'Pending at Venue',
      'Event Name': reg.eventName || 'TechTactix 2026',
      'Participant 1 Name': reg.participant1Name,
      'Participant 1 Roll No': reg.participant1RollNumber,
      'Participant 1 Year': reg.participant1Year,
      'Participant 1 Branch': reg.participant1Branch,
      'Participant 1 Email': reg.participant1Email,
      'Participant 1 Membership': reg.participant1Membership,
      'Participant 2 Name': reg.participant2Name,
      'Participant 2 Roll No': reg.participant2RollNumber,
      'Participant 2 Year': reg.participant2Year,
      'Participant 2 Branch': reg.participant2Branch,
      'Participant 2 Email': reg.participant2Email,
      'Participant 2 Membership': reg.participant2Membership,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    XLSX.writeFile(workbook, 'TechTactix_Registrations.xlsx');
  };

  return (
    <button
      onClick={handleDownload}
      className="px-6 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg border border-cyan-500/50 transition-colors flex items-center gap-2"
    >
      <Download size={18} />
      <span>Download Excel</span>
    </button>
  );
}
