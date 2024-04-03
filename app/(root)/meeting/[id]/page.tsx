"use client";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallbyId } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();

  const {call , isCallLoading} = useGetCallbyId(params.id);
  const [isSetupComplete, setIsSetupComplete] = React.useState(false);

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? <MeetingSetup/> : <MeetingRoom/>}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
