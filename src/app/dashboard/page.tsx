import Link from 'next/link';
import { Users, CreditCard, ShieldCheck } from 'lucide-react';
import DownloadExcelButton from '@/components/DownloadExcelButton';
import DeleteRegistrationButton from '@/components/DeleteRegistrationButton';
import { logoutAdmin } from '@/app/actions/auth';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const totalTeams = registrations.length;
  const totalStudents = totalTeams * 2;
  const totalRevenue = registrations.reduce((acc: number, curr: any) => acc + (curr.totalFee || 0), 0);
  const csiMembers = registrations.reduce((acc: number, curr: any) => {
    let count = 0;
    if (curr.participant1Membership === 'CSI Member') count++;
    if (curr.participant2Name && curr.participant2Membership === 'CSI Member') count++;
    return acc + count;
  }, 0);

  return (
    <main className="min-h-screen bg-navy-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-heading font-bold text-cyan-400 glow-text mb-2">ADMIN DASHBOARD</h1>
            <p className="text-slate-400">Live overview of TechTactix 2026 registrations</p>
          </div>
          <div className="flex items-center gap-4">
            <DownloadExcelButton registrations={registrations} />
            <Link href="/" className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-colors">
              Back to Website
            </Link>
            <form action={logoutAdmin}>
              <button type="submit" className="px-6 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg border border-red-500/20 transition-colors">
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Teams" value={totalTeams} icon={<Users className="text-cyan-400" />} />
          <StatCard title="Total Students" value={totalStudents} icon={<Users className="text-purple-400" />} />
          <StatCard title="CSI Members" value={csiMembers} icon={<ShieldCheck className="text-green-400" />} />
          <StatCard title="Expected Revenue" value={`₹${totalRevenue}`} icon={<CreditCard className="text-yellow-400" />} />
        </div>

        {/* Data Table */}
        <div className="glass-panel rounded-xl overflow-hidden border border-cyan-900/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-navy-950/80 border-b border-white/10 text-cyan-400 font-heading">
                <tr>
                  <th className="px-6 py-4">Reg ID</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 border-l border-white/5">Participant 1</th>
                  <th className="px-6 py-4">Branch/Year (P1)</th>
                  <th className="px-6 py-4 border-l border-white/5">Participant 2</th>
                  <th className="px-6 py-4">Branch/Year (P2)</th>
                  <th className="px-6 py-4 border-l border-white/5">Fee</th>
                  <th className="px-6 py-4 border-l border-white/5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {registrations.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                      No registrations found yet.
                    </td>
                  </tr>
                ) : (
                  registrations.map((reg: any, i: number) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-cyan-300">{reg.registrationId}</td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(reg.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      
                      {/* Participant 1 */}
                      <td className="px-6 py-4 border-l border-white/5">
                        <div className="font-bold text-white">{reg.participant1Name}</div>
                        <div className="text-xs text-slate-400">{reg.participant1RollNumber}</div>
                        <div className={`text-xs mt-1 ${reg.participant1Membership === 'CSI Member' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {reg.participant1Membership}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {reg.participant1Branch}<br/>
                        <span className="text-xs text-slate-500">{reg.participant1Year}</span>
                      </td>

                      {/* Participant 2 */}
                      <td className="px-6 py-4 border-l border-white/5">
                        {reg.participant2Name ? (
                          <>
                            <div className="font-bold text-white">{reg.participant2Name}</div>
                            <div className="text-xs text-slate-400">{reg.participant2RollNumber}</div>
                            <div className={`text-xs mt-1 ${reg.participant2Membership === 'CSI Member' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {reg.participant2Membership}
                            </div>
                          </>
                        ) : (
                          <div className="text-slate-500 italic">Solo Participant</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-300">
                        {reg.participant2Name ? (
                          <>
                            {reg.participant2Branch}<br/>
                            <span className="text-xs text-slate-500">{reg.participant2Year}</span>
                          </>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>

                      {/* Fee */}
                      <td className="px-6 py-4 border-l border-white/5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${reg.totalFee > 0 ? 'bg-yellow-400/10 text-yellow-400 border border-yellow-400/20' : 'bg-green-400/10 text-green-400 border border-green-400/20'}`}>
                          {reg.totalFee === 0 ? 'FREE' : `₹${reg.totalFee}`}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 border-l border-white/5 text-center">
                        <DeleteRegistrationButton id={reg.id} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ title, value, icon }: any) {
  return (
    <div className="glass-panel p-6 rounded-xl border border-cyan-900/30 flex items-center gap-4">
      <div className="p-4 bg-navy-950 rounded-lg border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm font-semibold">{title}</p>
        <p className="text-3xl font-heading font-bold text-white mt-1">{value}</p>
      </div>
    </div>
  );
}
