// pages/print.js
import Head from "next/head";
import ResumeCard from "../components/ResumeCard";

export default function PrintPage() {
  return (
    <>
      <Head>
        <title>Print — Patricia Giordano</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`@page{size:A4;margin:12mm;}body{margin:0;background:#fff}`}</style>
      </Head>

      <div style={{padding:"12mm", background:"#fff"}}>
        <ResumeCard />
      </div>
    </>
  );
}
