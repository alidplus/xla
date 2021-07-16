import {Spinner} from 'atoms'
function FixedLoading ({ onClose }) {
  const stopPropagation = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }
  return (
    <div
      onClick={stopPropagation}
      className="fixed-loading position-fixed start-0 top-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center z-index-10">
        <Spinner color="primary" />
        <hr/>
        <span>loading...</span>
    </div>
  )
}

export default FixedLoading
