'use client'
import React, { ReactNode, useEffect } from "react";
import 'animate.css';
import '/public/stylesheets/popup.css';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, ModalProps} from "@nextui-org/react";
export default function Popup({contents, title} : {contents: React.JSX.Element, title : React.JSX.Element}) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = React.useState<ModalProps["scrollBehavior"]>("inside");
    useEffect(onOpen, [contents]);

    return (
    <>
        <Button onPress={onOpen} className="cursor-help" color="primary"><img src = "/icons/book.png" width="25px"></img></Button>
        <Modal 
            backdrop="opaque" 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            scrollBehavior={scrollBehavior}
            size="xl"
            radius="lg"
            classNames={{
                body: "py-6 rounded",
                // body: "py-6",
                // backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                // base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                // header: "border-b-[1px] border-[#292f46]",
                // footer: "border-t-[1px] border-[#292f46]",
                // closeButton: "hover:bg-white/5 active:bg-white/10",
                base: "border-red-900 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f] shadow-red-600 bg-zinc-900 dark:bg-zinc-900 text-white",
                header: "border-b-[1px] border-red-800 text-red-500",
                footer: "border-t-[1px] border-red-800",
                closeButton: "hover:bg-red-700 active:bg-red-800 z-50",
            }}
        >
        <ModalContent>
            {(onClose) => (
            <>
            <div className = "animate__animated animate__lightSpeedInRight scale-75 transform right-1 fixed"><img src = "/icons/rover.png"></img></div>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>{contents}
                </ModalBody>
                <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                    Start Coding
                </Button>
                </ModalFooter>
            </>
            )}
        </ModalContent>
        </Modal>
    </>
    );
}
