import BrandBanner from "./BrandBanner";
import ConverterTool from "./ConverterTool";
import EditorTool from "./EdiotorTools";
import FileProcessing from "./FileProcessing";
import Hero from "./Hero";
import "./Home.css"

export default function Home() {
  return (
    <section>
      <Hero/>
      <BrandBanner/>
      <ConverterTool/>
      <EditorTool/>
      <FileProcessing/>
    </section>
  )
}
