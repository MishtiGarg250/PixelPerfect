import TopArticles from "@/components/home/top-articles";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion"
import { slideInFromRight } from "@/motion";
export default function Articles (){
  return (
    
    <section className="relative py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className=" text-3xl md:text-5xl font-bold text-center text-white">
            Featured <span className="text-[#b5b5f6]">Articles</span> behind <span className="text-[#b5b5f6]">Pixel Perfect</span>
          </h1>
          <motion.div
            variants={slideInFromRight(0.5)}
            className='cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center'
          >
            explore the
          </motion.div>
        </div>

        {/* Top Articles */}
        <Suspense fallback={<h1>Loading....</h1>}>
          <TopArticles />
        </Suspense>

        <div className="mt-12 text-center">
          <Link href={"/articles"}>
            <Button
              variant="outline"
              className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              View All Articles
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

