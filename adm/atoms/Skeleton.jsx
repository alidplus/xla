
import ReactContentLoader from 'react-content-loader';

const Skeleton = ({children, props}) => (
  <ReactContentLoader
    rtl={false}
    speed={2}
    width={400}
    height={150}
    viewBox="0 0 400 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {children}
  </ReactContentLoader>
)
// https://skeletonreact.com/
export default Skeleton
