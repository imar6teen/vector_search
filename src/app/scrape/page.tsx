import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ScrapeForm from "@/components/ScrapeForm";
import { Toaster } from "@/components/ui/toaster";

function page() {
  return (
    <main>
      <Card className="m-auto my-40 w-[40%]">
        <CardHeader>
          <CardTitle>Scrape URL</CardTitle>
          <CardDescription>Input URL You Want To Scrape</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrapeForm />
        </CardContent>
      </Card>
      <Toaster />
    </main>
  );
}

export default page;
