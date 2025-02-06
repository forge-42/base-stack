import { Link as ReactRouterLink, type LinkProps as ReactRouterLinkProps } from "react-router"

interface LinkProps extends ReactRouterLinkProps {}

export const Link = ({ prefetch = "intent", viewTransition = true, ...props }: LinkProps) => {
	return <ReactRouterLink prefetch={prefetch} viewTransition={viewTransition} {...props} />
}
