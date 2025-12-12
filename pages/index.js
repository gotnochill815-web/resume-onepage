// pages/index.js
import Head from "next/head";
import ResumeCard from "../components/ResumeCard";
import styles from "../components/Resume.module.css";

export default function Home() {

  async function downloadServerPdf() {
    try {
      const resp = await fetch("/api/generate-pdf");
      if (!resp.ok) throw new Error("PDF generation failed");
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Patricia_Giordano_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to generate PDF. Check console for details.");
    }
  }

  return (
    <>
      <Head><title>Patricia Giordano — Resume</title></Head>

      <div className="container-center" style={{paddingBottom:20}}>
        <ResumeCard />
        <div className={styles.actions} style={{maxWidth:794, margin:'18px auto 0'}}>
          <button className="btn" onClick={downloadServerPdf}>Download PDF</button>
        </div>
      </div>
    </>
  );
}
