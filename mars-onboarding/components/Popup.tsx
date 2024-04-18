"use client";
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, ModalProps} from "@nextui-org/react";

export default function Popup() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");

    return (
    <>
        <Button onPress={onOpen} color="secondary">Open Modal</Button>
        <Modal 
            backdrop="blur" 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
            size="xl"
            radius="lg"
            classNames={{
                //body: "py-6 rounded",
                body: "py-6",
                backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                header: "border-b-[1px] border-[#292f46]",
                footer: "border-t-[1px] border-[#292f46]",
                closeButton: "hover:bg-white/5 active:bg-white/10",
                // base: "border-red-900 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] shadow-red-600 bg-zinc-900 dark:bg-zinc-900 text-white",
                // header: "border-b-[1px] border-red-800",
                // footer: "border-t-[1px] border-red-800",
                // closeButton: "hover:bg-red-700 active:bg-red-800",
            }}
        >
        <ModalContent>
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                <p> 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                    Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                    Close
                </Button>
                </ModalFooter>
            </>
            )}
        </ModalContent>
        </Modal>
    </>
    );
}
