"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            size="sm"
            className="mb-10"
            onClick={() => router.back()}
        >
            <ArrowLeft size={16} />
            Back
        </Button>
    );
}