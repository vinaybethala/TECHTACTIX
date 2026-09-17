"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, useWatch } from "react-hook-form";

import * as z from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const branches = [
  "CSE", "CSE (AI & ML)", "CSE (Data Science)", "CSE (IoT)", "CSE (Cyber Security)",
  "ECE", "EEE", "MECH", "CIVIL", "AIML", "Other"
];

const participantSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  year: z.enum(["1st Year", "2nd Year", "3rd Year", "4th Year"], { required_error: "Year is required" }),
  branch: z.string().min(1, "Branch is required"),
  email: z.string().email("Invalid email address"),
  membership: z.enum(["CSI Member", "Non-CSI Member"], { required_error: "Membership status is required" }),
});

const formSchema = z.object({
  participant1: participantSchema,
  participant2: participantSchema,
});

const customZodResolver = (schema: any) => async (data: any) => {
  try {
    const values = await schema.parseAsync(data);
    return { values, errors: {} };
  } catch (errors: any) {
    return {
      values: {},
      errors: errors.issues.reduce((allErrors: any, currentError: any) => {
        const [p1, p2] = currentError.path;
        if (!allErrors[p1]) allErrors[p1] = {};
        allErrors[p1][p2] = { type: currentError.code, message: currentError.message };
        return allErrors;
      }, {}),
    };
  }
};

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isClosed, setIsClosed] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    // Check if registrations are closed (Sept 20, 2026 11:59 PM)
    const deadline = new Date("2026-09-20T23:59:59+05:30").getTime();
    if (new Date().getTime() > deadline) {
      setIsClosed(true);
    }
  }, []);

  const { register, handleSubmit, control, getValues, formState: { errors }, trigger } = useForm<FormValues>({
    resolver: customZodResolver(formSchema),
    mode: "onChange"
  });

  const p1Membership = useWatch({ control, name: "participant1.membership" });
  const p2Membership = useWatch({ control, name: "participant2.membership" });

  const calculateFee = () => {
    let fee = 0;
    if (p1Membership === "Non-CSI Member") fee += 30;
    if (p2Membership === "Non-CSI Member") fee += 30;
    return fee;
  };

  const nextStep = async () => {
    let valid = false;
    if (step === 1) {
      valid = await trigger("participant1");
    } else if (step === 2) {
      valid = await trigger("participant2");
    }
    
    if (valid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (step < 3) {
        nextStep();
      } else if (isAccepted && !isSubmitting) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.error || "Failed to register");
      }
      
      setSuccessData({ id: result.registrationId });
      setStep(4);
    } catch (error: any) {
      setErrorMsg(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isClosed) {
    return (
      <div className="glass-panel max-w-lg w-full mx-auto p-10 rounded-2xl border border-cyan-900/50 text-center">
        <h2 className="text-3xl font-heading font-bold text-white mb-4">REGISTRATION CLOSED</h2>
        <p className="text-slate-400 mb-8">Registrations for TechTactix 2026 have officially closed. Thank you for your interest!</p>
        <Link href="/" className="text-cyan-400 hover:text-cyan-300">← Back to Home</Link>
      </div>
    );
  }

  if (step === 4 && successData) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel max-w-2xl w-full mx-auto p-10 rounded-2xl border border-green-500/30 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-transparent"></div>
        <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-6" />
        <h2 className="text-3xl font-heading font-bold text-white mb-2">REGISTRATION CONFIRMED</h2>
        <p className="text-slate-400 mb-8">Your team is officially registered for TechTactix 2026.</p>
        
        <div className="bg-navy-950 p-6 rounded-xl border border-white/5 mb-8 text-left">
          <p className="text-sm text-slate-500 mb-1">Registration ID</p>
          <p className="text-2xl font-mono text-cyan-400 font-bold tracking-wider mb-6">{successData.id}</p>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500">Date</p>
              <p className="text-white">21 Sept 2026</p>
            </div>
            <div>
              <p className="text-slate-500">Time</p>
              <p className="text-white">10:00 AM onwards</p>
            </div>
            <div className="col-span-2">
              <p className="text-slate-500">Venue</p>
              <p className="text-white">St. Peter&apos;s Engineering College, Maisammaguda</p>
            </div>
          </div>
        </div>

        {calculateFee() > 0 ? (
          <div className="text-yellow-400 text-sm mb-8 bg-yellow-400/10 p-4 rounded-lg border border-yellow-400/20">
            Reminder: ₹{calculateFee()} is payable at the venue for Non-CSI members.
          </div>
        ) : (
          <div className="text-cyan-400 text-sm mb-8 bg-cyan-400/10 p-4 rounded-lg border border-cyan-400/20">
            CSI members are requested to bring their CSI ID card if possible.
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="https://chat.whatsapp.com/LOOqWLoBWqg55iakeue6FS?s=cl&p=a&mlu=4&ilr=4" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors font-bold glow-border"
          >
            JOIN WHATSAPP GROUP
          </a>
          <Link href="/" className="inline-block px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors border border-white/10">
            BACK TO HOME
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="glass-panel max-w-3xl w-full mx-auto p-6 md:p-10 rounded-2xl border border-cyan-900/50 shadow-2xl relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent"></div>
      
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-heading font-bold text-white mb-2">BUILD YOUR TEAM</h2>
        <p className="text-slate-400 text-sm md:text-base italic">&quot;Two minds. One team. One chance to dominate.&quot;</p>
      </div>

      {/* Progress */}
      <div className="flex justify-between items-center mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -z-10"></div>
        <div className={`absolute top-1/2 left-0 h-[1px] bg-cyan-500 transition-all duration-300 -z-10`} style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        
        {[1, 2, 3].map((num) => (
          <div key={num} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= num ? 'bg-cyan-500 text-navy-900 glow-border' : 'bg-navy-900 text-slate-500 border border-white/10'}`}>
            {num}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown} className="space-y-6">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-xl font-heading font-bold text-cyan-400 mb-6 border-b border-white/10 pb-2">PARTICIPANT 01</h3>
              <ParticipantFields prefix="participant1" register={register} errors={errors.participant1} />
              
              {p1Membership === "CSI Member" && (
                <div className="mt-4 p-3 bg-cyan-950/50 border border-cyan-900/50 rounded-lg text-sm text-cyan-400">
                  CSI Member — Registration is FREE. Please bring your CSI ID card if possible.
                </div>
              )}
              {p1Membership === "Non-CSI Member" && (
                <div className="mt-4 p-3 bg-yellow-950/50 border border-yellow-900/50 rounded-lg text-sm text-yellow-400">
                  Non-CSI Member — ₹30 payable at the venue.
                </div>
              )}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-xl font-heading font-bold text-cyan-400 mb-6 border-b border-white/10 pb-2">PARTICIPANT 02</h3>
              <ParticipantFields prefix="participant2" register={register} errors={errors.participant2} />
              
              {p2Membership === "CSI Member" && (
                <div className="mt-4 p-3 bg-cyan-950/50 border border-cyan-900/50 rounded-lg text-sm text-cyan-400">
                  CSI Member — Registration is FREE. Please bring your CSI ID card if possible.
                </div>
              )}
              {p2Membership === "Non-CSI Member" && (
                <div className="mt-4 p-3 bg-yellow-950/50 border border-yellow-900/50 rounded-lg text-sm text-yellow-400">
                  Non-CSI Member — ₹30 payable at the venue.
                </div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-2xl font-heading font-bold text-white mb-6 text-center">READY TO ENTER THE ARENA?</h3>
              
              <div className="bg-navy-950/80 rounded-xl border border-white/5 p-6 mb-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-cyan-400 font-bold mb-4 border-b border-white/10 pb-2">Participant 01</h4>
                    <SummaryData label="Name" value={getValues("participant1.name")} />
                    <SummaryData label="Roll No" value={getValues("participant1.rollNumber")} />
                    <SummaryData label="Branch" value={getValues("participant1.branch")} />
                    <SummaryData label="Year" value={getValues("participant1.year")} />
                    <SummaryData label="Status" value={p1Membership} highlight />
                  </div>
                  <div>
                    <h4 className="text-cyan-400 font-bold mb-4 border-b border-white/10 pb-2">Participant 02</h4>
                    <SummaryData label="Name" value={getValues("participant2.name")} />
                    <SummaryData label="Roll No" value={getValues("participant2.rollNumber")} />
                    <SummaryData label="Branch" value={getValues("participant2.branch")} />
                    <SummaryData label="Year" value={getValues("participant2.year")} />
                    <SummaryData label="Status" value={p2Membership} highlight />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-navy-950 to-navy-900 p-6 rounded-xl border border-cyan-900/50 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="font-bold text-white mb-1">PAYMENT SUMMARY</h4>
                  <p className="text-sm text-slate-400">Payment method: <strong className="text-white">Pay at Venue</strong></p>
                  {calculateFee() === 0 && <p className="text-sm text-cyan-400 mt-1">Both participants are CSI members. Registration is FREE.</p>}
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-400">TOTAL PAYABLE</div>
                  <div className="text-4xl font-heading font-bold text-cyan-400">₹{calculateFee()}</div>
                </div>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 bg-red-950/50 border border-red-900/50 rounded-lg text-sm text-red-400 text-center">
                  {errorMsg}
                </div>
              )}

              <label className="flex items-start gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={isAccepted}
                  onChange={(e) => setIsAccepted(e.target.checked)}
                  required 
                  className="mt-1 w-4 h-4 rounded border-gray-600 bg-navy-900 text-cyan-500 focus:ring-cyan-500" 
                />
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  I confirm that the information provided above is correct and I have read the payment instructions.
                </span>
              </label>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between pt-6 border-t border-white/10 mt-8">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="px-6 py-2 rounded-lg border border-white/20 text-slate-300 hover:bg-white/5 transition-colors">
              BACK
            </button>
          ) : <div></div>}

          {step < 3 ? (
            <button type="button" onClick={nextStep} className="px-8 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors glow-border flex items-center gap-2">
              NEXT STEP
            </button>
          ) : (
            <button type="submit" disabled={isSubmitting || !isAccepted} className={`px-8 py-2 font-bold rounded-lg transition-all flex items-center gap-2 ${isAccepted ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white glow-border' : 'bg-navy-900 text-slate-500 border border-white/10 cursor-not-allowed'}`}>
              {isSubmitting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> CONFIRMING...</>
              ) : (
                "REGISTER TEAM"
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function ParticipantFields({ prefix, register, errors }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-400 tracking-wider">FULL NAME</label>
        <input 
          {...register(`${prefix}.name`)} 
          className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="Enter full name"
        />
        {errors?.name && <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>}
      </div>
      
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-400 tracking-wider">ROLL NUMBER</label>
        <input 
          {...register(`${prefix}.rollNumber`)} 
          className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="e.g. 23XX1A0501"
        />
        {errors?.rollNumber && <p className="text-xs text-red-400 mt-1">{errors.rollNumber.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-400 tracking-wider">YEAR</label>
        <select 
          {...register(`${prefix}.year`)} 
          className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
        >
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
          <option value="3rd Year">3rd Year</option>
          <option value="4th Year">4th Year</option>
        </select>
        {errors?.year && <p className="text-xs text-red-400 mt-1">{errors.year.message}</p>}
      </div>

      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-400 tracking-wider">BRANCH</label>
        <select 
          {...register(`${prefix}.branch`)} 
          className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors appearance-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.2em' }}
        >
          <option value="">Select Branch</option>
          {branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        {errors?.branch && <p className="text-xs text-red-400 mt-1">{errors.branch.message}</p>}
      </div>

      <div className="space-y-1 md:col-span-2">
        <label className="text-xs font-semibold text-slate-400 tracking-wider">EMAIL ADDRESS</label>
        <input 
          type="email"
          {...register(`${prefix}.email`)} 
          className="w-full bg-navy-950 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          placeholder="college or personal email"
        />
        {errors?.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
      </div>

      <div className="space-y-2 md:col-span-2 mt-2">
        <label className="text-xs font-semibold text-slate-400 tracking-wider">CSI MEMBERSHIP</label>
        <div className="grid grid-cols-2 gap-4">
          <label className="relative flex cursor-pointer">
            <input type="radio" value="CSI Member" {...register(`${prefix}.membership`)} className="peer sr-only" />
            <div className="w-full p-4 rounded-lg border border-white/10 bg-navy-950 text-center text-slate-400 peer-checked:bg-cyan-900/20 peer-checked:border-cyan-500 peer-checked:text-cyan-400 transition-all font-medium">
              CSI MEMBER
            </div>
          </label>
          <label className="relative flex cursor-pointer">
            <input type="radio" value="Non-CSI Member" {...register(`${prefix}.membership`)} className="peer sr-only" />
            <div className="w-full p-4 rounded-lg border border-white/10 bg-navy-950 text-center text-slate-400 peer-checked:bg-purple-900/20 peer-checked:border-purple-500 peer-checked:text-purple-400 transition-all font-medium">
              NON-CSI MEMBER
            </div>
          </label>
        </div>
        {errors?.membership && <p className="text-xs text-red-400 mt-1">{errors.membership.message}</p>}
      </div>
    </div>
  );
}

function SummaryData({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className="flex justify-between py-1 border-b border-white/5 last:border-0">
      <span className="text-slate-500 text-sm">{label}</span>
      <span className={`text-sm font-medium ${highlight ? (value === 'CSI Member' ? 'text-cyan-400' : 'text-purple-400') : 'text-white'}`}>
        {value || "-"}
      </span>
    </div>
  );
}
