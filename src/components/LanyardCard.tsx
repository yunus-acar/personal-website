import React from "react";
import { Data as LanyardData } from "use-lanyard";
import { SiSpotify } from "react-icons/si";
import { ReactChild, ReactFragment, ReactPortal } from "react";

interface Props {
  lanyard: LanyardData | null;
}

export const LanyardCard = ({ lanyard }: Props) => {
  return (
    <div>
      <div
        className="flex flex-col space-y-5 w-full max-w-md 
					 px-4 py-4  
					bg-gray-900bg-opacity-50 
					backdrop-filter backdrop-blur-sm 
					border-2 border-gray-600 
					rounded-lg hover:shadow-lg 
					transition ease-in-out duration-300"
      >
        <div className="inline-flex items-center">
          <div
            className="max-w-md max-h-12 
								my-auto 
								rounded pointer-events-none select-none 
								ring-2 ring-gray-500"
          >
            <img
              src={`https://cdn.discordapp.com/avatars/${lanyard?.discord_user.id}/${lanyard?.discord_user.avatar}`}
              alt={lanyard?.discord_user.username}
              className="w-12 h-12"
            />
          </div>
          <div className="flex-1 	ml-4">
            <p className="text-base font-extrabold line-clamp-1 tracking-wide overflow-ellipsis text-gray-900 dark:text-white">
              {lanyard?.discord_user.username}
            </p>
            <p className="mt-1 text-xs tracking-wide font-medium 	text-gray-400">
              #{lanyard?.discord_user.discriminator}
            </p>
          </div>
          {lanyard?.discord_status === "online" ? (
            <LanyardStatus color="green" />
          ) : lanyard?.discord_status === "dnd" ? (
            <LanyardStatus color="red" />
          ) : lanyard?.discord_status === "idle" ? (
            <LanyardStatus color="yellow" />
          ) : (
            <LanyardStatus color="gray" />
          )}
        </div>
        {lanyard?.listening_to_spotify && (
          <>
            <hr className="h-0.5 my-4	bg-gray-600	border-none	rounded-full" />

            <div className="inline-flex items-center">
              <div
                className="max-w-md max-h-12 
								my-auto 
								rounded pointer-events-none select-none 
								ring-2 ring-gray-500"
              >
                <img
                  src={lanyard?.spotify?.album_art_url}
                  alt={`${lanyard?.spotify?.song} - ${lanyard?.spotify?.artist}`}
                  className="w-12 h-12 rounded"
                />
              </div>
              <div className="flex-1 	ml-4">
                <p className="text-base font-extrabold line-clamp-1 tracking-wide overflow-ellipsis text-gray-900 dark:text-white">
                  {lanyard?.spotify?.song}
                </p>
                <p className="mt-1 text-xs tracking-wide font-medium 	text-gray-400">
                  {lanyard?.spotify?.artist}
                </p>
              </div>
              <SiSpotify className="w-6 h-6 mx-3 text-gray-200 dark:text-gray-400 animate-pulse" />
            </div>
          </>
        )}
        {lanyard?.activities.map((activity, i) => {
          return activity.name === "Spotify" ? (
            <></>
          ) : activity.name === "Custom Status" ? (
            <></>
          ) : (
            <div key={i + 1}>
              <hr className="h-0.5 mb-4	bg-gray-600	border-none	rounded-full" />
              <div className="inline-flex items-center">
                <div
                  className="max-w-md max-h-12 
								my-auto 
								rounded pointer-events-none select-none 
								ring-2 ring-gray-500"
                >
                  <img
                    src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets?.large_image}.webp`}
                    alt={`${lanyard?.spotify?.song} - ${lanyard?.spotify?.artist}`}
                    className="w-12 h-12 rounded"
                  />
                </div>
                <div className="flex-1 	ml-4">
                  <p className="text-base font-extrabold line-clamp-1 tracking-wide overflow-ellipsis text-gray-900 dark:text-white">
                    {activity.name}
                  </p>
                  <p className="mt-1 text-xs tracking-wide font-medium 	text-gray-400">
                    {activity.details}
                  </p>
                  <p className="mt-1 text-xs tracking-wide font-medium 	text-gray-400">
                    {activity.state}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

function LanyardStatus({ color }: { color: string }) {
  return (
    <div className="relative inline-flex justify-center items-center w-5 h-5 mr-3">
      <div className="absolute flex h-3 w-3">
        <div
          className={`absolute inline-flex w-full h-full bg-${color}-500 opacity-75 rounded-full animate-ping`}
        ></div>
        <div
          className={`relative inline-flex w-3 h-3 bg-${color}-500 rounded-full`}
        ></div>
      </div>
    </div>
  );
}
