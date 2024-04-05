"use client";
import { cn } from "@/lib/utils";
import { CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

type CallLayoutType = "GRID" | "SPEAKER_LEFT" | "SPEAKER_RIGHT";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<CallLayoutType>("SPEAKER_LEFT");
  const [showParticipants , setShowParticipants] = useState(false);

  const CallLayout = () => {
    switch (layout) {
      case "GRID":
        return <PaginatedGridLayout />;
      case "SPEAKER_LEFT":
        return <SpeakerLayout participantsBarPosition={"left"} />;
      case "SPEAKER_RIGHT":
        return <SpeakerLayout participantsBarPosition={"right"} />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="flex relative size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div className={cn("h-[calc(100vh-86px)] hidden ml-2",{'show-block':showParticipants})}>
          <CallParticipantsList onClose={()=>setShowParticipants(false)}/>
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
