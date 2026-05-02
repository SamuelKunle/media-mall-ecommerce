"use client";

import { Briefcase, MapPin, Clock, Building2, ArrowLeft, CheckCircle, Upload } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import PageTransition from "@/components/PageTransition";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomNav from "@/components/MobileBottomNav";

const jobDetails: Record<string, {
  title: string; dept: string; location: string; type: string;
  about: string; responsibilities: string[]; requirements: string[]; niceToHave: string[];
}> = {
  "senior-frontend-developer": {
    title: "Senior Frontend Developer", dept: "Engineering", location: "Lagos (Hybrid)", type: "Full-time",
    about: "We're looking for a Senior Frontend Developer to lead the build-out of our e-commerce platform. You'll work closely with design and product to ship fast, accessible, and beautiful user experiences that serve hundreds of thousands of customers.",
    responsibilities: [
      "Architect and build new features for our React-based e-commerce platform",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with designers to implement pixel-perfect UI components",
      "Optimize performance and Core Web Vitals across all pages",
      "Contribute to our design system and component library",
    ],
    requirements: [
      "5+ years of professional frontend development experience",
      "Expert-level React and TypeScript skills",
      "Experience with state management, routing, and API integration",
      "Strong understanding of responsive design and accessibility",
      "Experience with performance optimization and testing",
    ],
    niceToHave: [
      "E-commerce platform experience",
      "Experience with Tailwind CSS and Framer Motion",
      "Familiarity with CI/CD pipelines and deployment",
    ],
  },
  "product-manager": {
    title: "Product Manager", dept: "Product", location: "Lagos", type: "Full-time",
    about: "Join our product team to define and drive the roadmap for MediaMall's digital products. You'll own key user journeys from discovery to checkout, using data and customer insights to make decisions.",
    responsibilities: [
      "Define product strategy and roadmap for e-commerce features",
      "Write clear product specs and user stories",
      "Analyze user behavior data to identify opportunities",
      "Work cross-functionally with engineering, design, and marketing",
      "Run A/B tests and measure feature impact",
    ],
    requirements: [
      "3+ years of product management experience",
      "Strong analytical skills and data-driven mindset",
      "Experience with e-commerce or marketplace products",
      "Excellent communication and stakeholder management",
      "Familiarity with agile development processes",
    ],
    niceToHave: ["Experience in the Nigerian or African tech ecosystem", "Technical background", "SQL proficiency"],
  },
  "store-manager": {
    title: "Store Manager", dept: "Retail", location: "Abuja", type: "Full-time",
    about: "Lead one of our flagship stores in Abuja. You'll manage a team of sales associates, hit revenue targets, and ensure every customer has a world-class in-store experience.",
    responsibilities: [
      "Manage daily store operations and team of 8–12 associates",
      "Drive sales performance and meet monthly revenue targets",
      "Ensure exceptional customer service standards",
      "Manage inventory, visual merchandising, and store presentation",
      "Recruit, train, and develop team members",
    ],
    requirements: [
      "3+ years retail management experience",
      "Proven track record of meeting sales targets",
      "Strong leadership and team management skills",
      "Excellent customer service orientation",
      "Knowledge of electronics products is a plus",
    ],
    niceToHave: ["Electronics retail experience", "Experience with POS and inventory systems", "Based in Abuja"],
  },
  "customer-experience-lead": {
    title: "Customer Experience Lead", dept: "Support", location: "Remote", type: "Full-time",
    about: "Own the end-to-end customer experience at MediaMall. From support ticket resolution to proactive customer success, you'll ensure our 500K+ customers love every interaction.",
    responsibilities: [
      "Lead a team of customer support agents across channels",
      "Define and improve support processes and SLAs",
      "Analyze support metrics and identify improvement areas",
      "Build self-service resources (FAQs, guides, tutorials)",
      "Champion the voice of the customer across the organization",
    ],
    requirements: [
      "4+ years in customer experience or support leadership",
      "Experience managing remote support teams",
      "Strong analytical and process improvement skills",
      "Excellent written and verbal communication",
      "Experience with support tools (Zendesk, Intercom, etc.)",
    ],
    niceToHave: ["E-commerce support experience", "Experience building knowledge bases", "CSAT/NPS optimization experience"],
  },
  "digital-marketing-specialist": {
    title: "Digital Marketing Specialist", dept: "Marketing", location: "Lagos (Hybrid)", type: "Full-time",
    about: "Drive customer acquisition and engagement through digital channels. You'll plan, execute, and optimize campaigns across paid, social, email, and content marketing.",
    responsibilities: [
      "Plan and execute digital marketing campaigns across channels",
      "Manage paid advertising (Google, Meta, TikTok)",
      "Create and optimize email marketing flows",
      "Analyze campaign performance and ROI",
      "Collaborate with content creators and influencers",
    ],
    requirements: [
      "3+ years digital marketing experience",
      "Hands-on experience with Google Ads and Meta Ads",
      "Strong analytical skills and proficiency with analytics tools",
      "Experience with email marketing platforms",
      "Creative mindset with attention to data",
    ],
    niceToHave: ["E-commerce marketing experience", "SEO expertise", "Experience in the Nigerian market"],
  },
  "supply-chain-analyst": {
    title: "Supply Chain Analyst", dept: "Operations", location: "Lagos", type: "Full-time",
    about: "Optimize our supply chain to ensure the right products are in the right place at the right time. You'll work with procurement, logistics, and store teams to minimize costs and maximize availability.",
    responsibilities: [
      "Forecast demand and optimize inventory levels across 30+ stores",
      "Analyze supply chain costs and identify savings opportunities",
      "Coordinate with suppliers and logistics partners",
      "Build dashboards and reports for supply chain KPIs",
      "Support new store openings with inventory planning",
    ],
    requirements: [
      "2+ years in supply chain, logistics, or operations analytics",
      "Strong Excel/Google Sheets and SQL skills",
      "Experience with inventory management systems",
      "Analytical and detail-oriented mindset",
      "Bachelor's degree in a relevant field",
    ],
    niceToHave: ["Electronics or retail supply chain experience", "Experience with ERP systems", "Python or BI tool skills"],
  },
  "retail-sales-associate": {
    title: "Retail Sales Associate", dept: "Retail", location: "Multiple Locations", type: "Full-time",
    about: "Be the face of MediaMall. Help customers find the perfect electronics products while delivering an exceptional in-store experience. Multiple positions available across Nigeria.",
    responsibilities: [
      "Assist customers with product selection and recommendations",
      "Demonstrate product features and handle customer questions",
      "Process sales transactions and handle payments",
      "Maintain product displays and store cleanliness",
      "Meet individual and store sales targets",
    ],
    requirements: [
      "1+ year retail or customer-facing experience",
      "Strong communication and interpersonal skills",
      "Interest in technology and electronics",
      "Ability to work flexible hours including weekends",
      "High school diploma or equivalent",
    ],
    niceToHave: ["Electronics product knowledge", "Previous sales experience", "Multilingual ability"],
  },
  "ui-ux-designer": {
    title: "UI/UX Designer", dept: "Design", location: "Remote", type: "Contract",
    about: "Design beautiful, intuitive interfaces for our e-commerce platform and mobile experiences. You'll work closely with product and engineering to create designs that drive conversion and delight users.",
    responsibilities: [
      "Design user interfaces for web and mobile platforms",
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Maintain and evolve our design system",
      "Collaborate with developers to ensure design implementation quality",
    ],
    requirements: [
      "3+ years of UI/UX design experience",
      "Strong portfolio demonstrating e-commerce or product design work",
      "Proficiency in Figma",
      "Understanding of design systems and component-based design",
      "Knowledge of web accessibility standards",
    ],
    niceToHave: ["E-commerce design experience", "Basic frontend development skills", "Motion design skills"],
  },
};

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(20),
  linkedin: z.string().trim().max(200).optional().or(z.literal("")),
  portfolio: z.string().trim().max(200).optional().or(z.literal("")),
  experience: z.string().trim().min(1, "Please select your experience level"),
  coverLetter: z.string().trim().min(50, "Cover letter must be at least 50 characters").max(2000),
});

const JobApplication = () => {
  const params = useParams();
  const slug = params.slug as string | undefined;
  const job = slug ? jobDetails[slug] : null;

  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", linkedin: "", portfolio: "", experience: "", coverLetter: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [resumeName, setResumeName] = useState("");

  if (!job) {
    return (
      <PageTransition>
        <SiteHeader />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl font-bold text-foreground mb-2">Position Not Found</h1>
            <p className="text-sm text-muted-foreground mb-4">This job listing may have been removed.</p>
            <Link href="/careers" className="text-sm font-semibold text-primary hover:underline">← Back to Careers</Link>
          </div>
        </main>
        <SiteFooter />
        <MobileBottomNav />
      </PageTransition>
    );
  }

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = applicationSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors below");
      return;
    }
    if (!resumeName) {
      toast.error("Please upload your resume");
      return;
    }
    setSubmitted(true);
    toast.success("Application submitted successfully!");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File must be under 5MB");
        return;
      }
      setResumeName(file.name);
    }
  };

  if (submitted) {
    return (
      <PageTransition>
        <SiteHeader />
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Application Submitted!</h1>
            <p className="text-sm text-muted-foreground mb-2">Thank you for applying for <span className="font-semibold text-foreground">{job.title}</span>.</p>
            <p className="text-sm text-muted-foreground mb-8">Our hiring team will review your application and get back to you within 5–7 business days.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/careers" className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity">
                View More Positions
              </Link>
              <Link href="/" className="px-5 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-secondary transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <SiteFooter />
        <MobileBottomNav />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Job Header */}
        <section className="bg-card border-b border-border py-10 md:py-14">
          <div className="container max-w-3xl">
            <Link href="/careers" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Positions
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary"><Building2 className="w-3.5 h-3.5" /> {job.dept}</span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
            </div>
          </div>
        </section>

        <div className="container max-w-3xl py-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Job Details */}
            <div className="lg:col-span-3 space-y-8">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-3">About the Role</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{job.about}</p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-3">Responsibilities</h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-3">Requirements</h2>
                <ul className="space-y-2">
                  {job.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground mb-3">Nice to Have</h2>
                <ul className="space-y-2">
                  {job.niceToHave.map((r) => (
                    <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground shrink-0 mt-2" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Application Form */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-foreground mb-1">Apply for this Role</h2>
                <p className="text-xs text-muted-foreground mb-5">All fields marked * are required</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Full Name *</label>
                    <input value={form.fullName} onChange={(e) => handleChange("fullName", e.target.value)} maxLength={100}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder="John Doe" />
                    {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Email *</label>
                    <input value={form.email} onChange={(e) => handleChange("email", e.target.value)} type="email" maxLength={255}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder="john@example.com" />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Phone *</label>
                    <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} type="tel" maxLength={20}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder="+234 800 000 0000" />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Experience Level *</label>
                    <select value={form.experience} onChange={(e) => handleChange("experience", e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                      <option value="">Select...</option>
                      <option value="0-1">0–1 years</option>
                      <option value="1-3">1–3 years</option>
                      <option value="3-5">3–5 years</option>
                      <option value="5-8">5–8 years</option>
                      <option value="8+">8+ years</option>
                    </select>
                    {errors.experience && <p className="text-xs text-destructive mt-1">{errors.experience}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">LinkedIn (optional)</label>
                    <input value={form.linkedin} onChange={(e) => handleChange("linkedin", e.target.value)} maxLength={200}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder="linkedin.com/in/johndoe" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Portfolio (optional)</label>
                    <input value={form.portfolio} onChange={(e) => handleChange("portfolio", e.target.value)} maxLength={200}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      placeholder="yourportfolio.com" />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Resume / CV *</label>
                    <label className="flex items-center gap-2 w-full px-3 py-3 rounded-lg border border-dashed border-border bg-secondary/50 text-sm cursor-pointer hover:border-primary/30 transition-colors">
                      <Upload className="w-4 h-4 text-muted-foreground" />
                      <span className={resumeName ? "text-foreground" : "text-muted-foreground"}>
                        {resumeName || "Upload PDF, DOC (max 5MB)"}
                      </span>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-foreground mb-1 block">Cover Letter *</label>
                    <textarea value={form.coverLetter} onChange={(e) => handleChange("coverLetter", e.target.value)} maxLength={2000} rows={4}
                      className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                      placeholder="Tell us why you're interested in this role and what makes you a great fit..." />
                    <div className="flex justify-between mt-1">
                      {errors.coverLetter && <p className="text-xs text-destructive">{errors.coverLetter}</p>}
                      <p className="text-xs text-muted-foreground ml-auto">{form.coverLetter.length}/2000</p>
                    </div>
                  </div>

                  <button type="submit" className="w-full py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity">
                    Submit Application
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center">By submitting, you agree to our privacy policy and data processing terms.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <MobileBottomNav />
    </PageTransition>
  );
};

export default JobApplication;
