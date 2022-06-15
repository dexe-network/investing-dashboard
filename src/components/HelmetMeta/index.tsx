import { useLocation } from "react-router-dom"
import { Helmet } from "react-helmet"

interface IProps {
  quote?: string
  title?: string
  image?: string
  description?: string
  hashtag?: string
  children?: React.ReactNode
}

const defaultQuote = "DEXE investment"
const defaultTitle = "DEXE investment with DAO"
const defaultImage = "https://dexe.network/static/media/logo.6a8f012a.svg"
const defaultDesctiption = "DEXE is a decentralized exchange for tokens"

const HelmetMeta: React.FC<IProps> = ({
  quote = defaultQuote,
  title = defaultTitle,
  image = defaultImage,
  description = defaultDesctiption,
  hashtag = "#dexe",
  children = null,
}) => {
  const location = useLocation()
  const currentUrl = "http://app.dexe.network" + location.pathname

  console.log(currentUrl)

  return (
    <Helmet>
      <meta property="type" content="website" />
      <meta property="url" content={currentUrl} />
      <meta property="title" content={title} />
      <meta property="quote" content={quote} />
      <meta name="description" content={description} />
      <meta property="image" content={image} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:quote" content={quote} />
      <meta property="og:hashtag" content={hashtag} />
      <meta property="og:image" content={image} />
      <meta content="image/*" property="og:image:type" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="DEXE" />
      <meta property="og:description" content={description} />
      {children}
    </Helmet>
  )
}

export default HelmetMeta
