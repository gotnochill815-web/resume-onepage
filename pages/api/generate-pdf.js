// pages/api/generate-pdf.js
import puppeteer from "puppeteer";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end("Method Not Allowed");
  }

  const host = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const target = `${host}/print`;

  let browser;
  try {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // viewport large enough for A4 layout
    await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 1 });

    // navigate to the print page and wait for network to quiet down
    await page.goto(target, { waitUntil: "networkidle0" });

    // Small delay to ensure fonts/rendering are stable (use universal sleep)
    await new Promise((resolve) => setTimeout(resolve, 300));

    // produce PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "12mm", bottom: "12mm", left: "12mm", right: "12mm" },
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="Patricia_Giordano_Resume.pdf"`);
    res.status(200).send(pdfBuffer);
  } catch (err) {
    console.error("PDF gen error:", err);
    res.status(500).json({ error: "Failed to generate PDF", details: String(err) });
  } finally {
    if (browser) {
      try { await browser.close(); } catch (e) { /* ignore */ }
    }
  }
}
