import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import {MarketingHeader} from "@/components/landing/marketing-header"
import {MarketingFooter} from "@/components/landing/marketing-footer"
export default function Home() {
  return (

    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
            <div className="flex justify-center items-center h-screen ">
            <main className="">
              <section className="flex justify-center items-center ">
                <div className=" mt-3">
                  <Button>
                    <Link href="/dashboard"> Dashboard </Link>
                  </Button>
                </div>
              </section>
            </main>
            </div>
      <MarketingFooter />
    </div>
  );
}
