import BannerSlidernew from "../../../components/BannerSlidernew/BannerSlidernew";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import TitleText from "../../../components/Text/TitleText";

export default function Docs({
    params, 
 }: {
    params: { 
        docsId: string };
 }) {

    return <h1>Documento {params.docsId}</h1>;
}

 
