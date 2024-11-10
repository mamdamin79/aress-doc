import React from "react";
import { Icon } from "../../../Icon";
import { Button } from "../../../Button";

type Props = {
    isPlaying:boolean,
    pause:()=>void,
    play:()=>void,
}

export const PlayerActions : React.FC<Props> = ({
    isPlaying,
    pause,
    play
})=>{
    return (
        <>
            <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="skip-back" />
              </button>
              {isPlaying ? (
                <Button
                  onMouseDown={pause}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      pause();
                    }
                  }}
                  mode="primary"
                  size="sm"
                  isLoading={false}
                  align="center"
                >
                  <Icon name="pause" />
                </Button>
              ) : (
                <Button
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      play();
                    }
                  }}
                  onMouseDown={play}
                  mode="primary"
                  size="sm"
                  isLoading={false}
                  align="center"
                >
                  <Icon name="play" />
                </Button>
              )}
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="skip-forward" />
              </button>
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="volume-2" />
              </button>
        </>
    )
}