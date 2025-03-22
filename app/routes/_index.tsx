import {
	Dropdown,
	DropdownButton,
	DropdownDivider,
	DropdownItem,
	DropdownLabel,
	DropdownMenu,
} from "@/library/components/dropdown"
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from "@/library/components/navbar"
import {
	Sidebar,
	SidebarBody,
	SidebarFooter,
	SidebarHeader,
	SidebarHeading,
	SidebarItem,
	SidebarLabel,
	SidebarSection,
	SidebarSpacer,
} from "@/library/components/sidebar"
import { SidebarLayout } from "@/library/components/sidebar-layout"
import {
	ArrowRightStartOnRectangleIcon,
	ChevronDownIcon,
	ChevronUpIcon,
	Cog8ToothIcon,
	LightBulbIcon,
	PlusIcon,
	ShieldCheckIcon,
	UserIcon,
} from "@heroicons/react/16/solid"
import {
	Cog6ToothIcon,
	HomeIcon,
	InboxIcon,
	MagnifyingGlassIcon,
	MegaphoneIcon,
	QuestionMarkCircleIcon,
	SparklesIcon,
	Square2StackIcon,
	TicketIcon,
} from "@heroicons/react/20/solid"
import { useTranslation } from "react-i18next"
import { Avatar } from "~/library/components/avatar"

export default function Home() {
	const { t } = useTranslation()

	return (
		<SidebarLayout
			navbar={
				<Navbar>
					<NavbarSpacer />
					<NavbarSection>
						<NavbarItem href="/search" aria-label={t("menu.header.search")}>
							<MagnifyingGlassIcon />
						</NavbarItem>
						<NavbarItem href="/inbox" aria-label={t("menu.header.inbox")}>
							<InboxIcon />
						</NavbarItem>
						<Dropdown>
							<DropdownButton as={NavbarItem}>
								<Avatar src="/users/erica.jpg" square />
							</DropdownButton>
							<DropdownMenu className="min-w-64" anchor="bottom end">
								<DropdownItem href="/my-profile">
									<UserIcon />
									<DropdownLabel>{t("menu.dropdown.myProfile")}</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>{t("menu.dropdown.settings")}</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/privacy-policy">
									<ShieldCheckIcon />
									<DropdownLabel>{t("menu.dropdown.privacyPolicy")}</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/share-feedback">
									<LightBulbIcon />
									<DropdownLabel>{t("menu.dropdown.shareFeedback")}</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/logout">
									<ArrowRightStartOnRectangleIcon />
									<DropdownLabel>{t("menu.dropdown.signOut")}</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</NavbarSection>
				</Navbar>
			}
			sidebar={
				<Sidebar>
					<SidebarHeader>
						<Dropdown>
							<DropdownButton as={SidebarItem} className="lg:mb-2.5">
								<Avatar src="users/erica.jpg" />
								<SidebarLabel>{t("menu.header.tailwindLabs")}</SidebarLabel>
								<ChevronDownIcon />
							</DropdownButton>
							<DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
								<DropdownItem href="/teams/1/settings">
									<Cog8ToothIcon />
									<DropdownLabel>{t("menu.dropdown.settings")}</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/teams/1">
									<Avatar slot="icon" src="users/erica.jpg" />
									<DropdownLabel>{t("menu.header.tailwindLabs")}</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/teams/2">
									<Avatar slot="icon" initials="WC" className="bg-purple-500 text-white" />
									<DropdownLabel>Workcation</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/teams/create">
									<PlusIcon />
									<DropdownLabel>{t("menu.dropdown.newTeam")}</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
						<SidebarSection className="max-lg:hidden">
							<SidebarItem href="/search">
								<MagnifyingGlassIcon />
								<SidebarLabel>{t("menu.header.search")}</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/inbox">
								<InboxIcon />
								<SidebarLabel>{t("menu.header.inbox")}</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
					</SidebarHeader>
					<SidebarBody>
						<SidebarSection>
							<SidebarItem href="/">
								<HomeIcon />
								<SidebarLabel>{t("menu.sidebar.home")}</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/events">
								<Square2StackIcon />
								<SidebarLabel>{t("menu.sidebar.events")}</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/orders">
								<TicketIcon />
								<SidebarLabel>{t("menu.sidebar.orders")}</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/settings">
								<Cog6ToothIcon />
								<SidebarLabel>{t("menu.sidebar.settings")}</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/broadcasts">
								<MegaphoneIcon />
								<SidebarLabel>{t("menu.sidebar.broadcasts")}</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
						<SidebarSection className="max-lg:hidden">
							<SidebarHeading>{t("menu.sidebar.upcomingEvents")}</SidebarHeading>
							<SidebarItem href="/events/1">{t("menu.sidebar.bearHug")}</SidebarItem>
							<SidebarItem href="/events/2">{t("menu.sidebar.vikingPeople")}</SidebarItem>
							<SidebarItem href="/events/3">{t("menu.sidebar.sixFingers")}</SidebarItem>
						</SidebarSection>
						<SidebarSpacer />
						<SidebarSection>
							<SidebarItem href="/support">
								<QuestionMarkCircleIcon />
								<SidebarLabel>{t("menu.sidebar.support")}</SidebarLabel>
							</SidebarItem>
							<SidebarItem href="/changelog">
								<SparklesIcon />
								<SidebarLabel>{t("menu.sidebar.changelog")}</SidebarLabel>
							</SidebarItem>
						</SidebarSection>
					</SidebarBody>
					<SidebarFooter className="max-lg:hidden">
						<Dropdown>
							<DropdownButton as={SidebarItem}>
								<span className="flex min-w-0 items-center gap-3">
									<Avatar src="/users/erica.jpg" className="size-10" square alt="" />
									<span className="min-w-0">
										<span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
											{t("menu.user.name")}
										</span>
										<span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
											{t("menu.user.email")}
										</span>
									</span>
								</span>
								<ChevronUpIcon />
							</DropdownButton>
							<DropdownMenu className="min-w-64" anchor="top start">
								<DropdownItem href="/my-profile">
									<UserIcon />
									<DropdownLabel>{t("menu.dropdown.myProfile")}</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/settings">
									<Cog8ToothIcon />
									<DropdownLabel>{t("menu.dropdown.settings")}</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/privacy-policy">
									<ShieldCheckIcon />
									<DropdownLabel>{t("menu.dropdown.privacyPolicy")}</DropdownLabel>
								</DropdownItem>
								<DropdownItem href="/share-feedback">
									<LightBulbIcon />
									<DropdownLabel>{t("menu.dropdown.shareFeedback")}</DropdownLabel>
								</DropdownItem>
								<DropdownDivider />
								<DropdownItem href="/logout">
									<ArrowRightStartOnRectangleIcon />
									<DropdownLabel>{t("menu.dropdown.signOut")}</DropdownLabel>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</SidebarFooter>
				</Sidebar>
			}
		>
			{/* The page content */}
		</SidebarLayout>
	)
}
