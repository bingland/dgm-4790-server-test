import './DeleteConfirm.scss'
import { useQuery, gql, useMutation } from '@apollo/client'

const DeleteConfirm = props => {

  const DELETE_COMMENT = gql`
    mutation ($id:String!) {
      deleteComment(id:$id) {
        id
        name
        description
        comments {
          id
          title
          date 
          body
          forum
        }
      }
    }
  `

  const DeleteComment = () => {
    const [deleteComment] = useMutation(DELETE_COMMENT, {
      onCompleted ({deleteComment}) {
        console.log(deleteComment)
      }
    })

    return (
      <button className="delBtn" onClick={() => {
        deleteComment({ 
          variables: {
            id: props.currentCommentId
          } 
        })
        props.toggleDeleteConfirm()
      }}>Delete</button>
    )
  }

  return (
    <div className="deleteConfirmBackground">
      <div className="DeleteConfirm">
        <h1>Delete comment?</h1>
        <DeleteComment />
        <button onClick={props.toggleDeleteConfirm}>Cancel</button>
      </div>
    </div>
  )
}

export default DeleteConfirm
