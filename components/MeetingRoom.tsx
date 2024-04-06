"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Loader, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "GRID" | "SPEAKER_LEFT" | "SPEAKER_RIGHT";

const MeetingRoom = () => {
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get("personal")
  const [layout, setLayout] = useState<CallLayoutType>("SPEAKER_LEFT");
  const [showParticipants, setShowParticipants] = useState(false);

  const {useCallCallingState} = useCallStateHooks();

  const callingState = useCallCallingState();

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

  if(callingState !==CallingState.JOINED) return <Loader/>

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="flex relative size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />

        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>{" "}
          </div>

          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {[
              { label: "grid", value: "GRID" },
              {
                label: "Speaker Left",
                value: "SPEAKER_LEFT",
              },
              {
                label: "Speaker Right",
                value: "SPEAKER_RIGHT",
              },
            ].map((layoutType, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => setLayout(layoutType.value as CallLayoutType)}
                >
                  {layoutType.label}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />
        <button onClick={()=>setShowParticipants((prev)=>!prev)}>
              <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 hover:bg-[#4c535b] ">
              <User size={20} className="text-white" />
              </div>
        </button>
        {
          !isPersonalRoom && <EndCallButton/>
        }
      </div>
    </section>
  );
};

export default MeetingRoom;
 