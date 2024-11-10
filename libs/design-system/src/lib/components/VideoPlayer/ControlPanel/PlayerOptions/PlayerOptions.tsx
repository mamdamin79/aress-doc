import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItems } from "@headlessui/react"
import { Icon } from "../../../Icon"

type Props = {
    fullScreen:()=>void,
    pictureInPicture:()=>void

}

export const PlayerOptions : React.FC<Props> = ({
    pictureInPicture,
    fullScreen
})=>{
    return (
        <div className="flex items-center gap-4">
              <button className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                <Icon name="share-2" />
              </button>
              <Menu>
                <MenuButton className="text-white relative flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all">
                  <Icon name="settings" />
                </MenuButton>
                <MenuItems
                  className="w-60 bg-gray-900/90 border-gray-200 rounded-md border-[1.5px]"
                  anchor={{ to: 'top', gap: '48px' }}
                >
                  <Disclosure as="div" className="p-6" defaultOpen={true}>
                    <DisclosureButton className="group flex w-full items-center justify-between">
                      <span className="flex-row-reverse gap-2 items-center font-medium text-white flex justify-between ">
                        سرعت پخش <Icon name="circle-gauge" />
                      </span>
                      <span className="text-white">
                        <Icon name="chevron-left" />
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel className="">
                      If you're unhappy with your purchase, we'll refund you in
                      full.
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure as="div" className="p-6">
                    <DisclosureButton className=" flex w-full items-center justify-between">
                      <span className=" font-medium flex flex-row-reverse text-white">
                        کیفیت
                        <span className='text-white'>
                          <Icon name="sliders-horizontal" />
                        </span>
                      </span>
                      <span className="text-white">
                        <Icon name="chevron-left" />
                      </span>
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 text-sm/5 text-white/50"></DisclosurePanel>
                  </Disclosure>
                </MenuItems>
              </Menu>
              <button
                onClick={pictureInPicture}
                className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all"
              >
                <Icon name="picture-in-picture-2" />
              </button>
              <button
                onClick={fullScreen}
                className="text-white flex items-center justify-center p-1 hover:text-brand-600 duration-300 transition-all"
              >
                <Icon name="fullscreen" />
              </button>
            </div>
    )
}