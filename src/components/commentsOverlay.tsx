import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

interface IComment {
  displayMessage: number;
  displayName: string;
  profileImageUrl: string;
  publishedAt: Date;
}

interface ICommentsSelectedResponse {
  livestreamChannelId: string;
  comment: IComment;
}
interface ICommentsOverlayProps {
  commentSelected: ICommentsSelectedResponse;
}

export default function CommentsOverlay({
  commentSelected,
}: ICommentsOverlayProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="outline-dark"
        onClick={handleShow}
        className="mt-3 btn-block"
      >
        Ver comentário selecionado
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comentário Selecionado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {commentSelected && (
            <div>
              <div className="card p-2 my-2">
                <div className="media d-flex align-items-center">
                  <img
                    src={commentSelected.comment.profileImageUrl}
                    className="mr-3 rounded-circle"
                    alt="..."
                    width="60rem"
                  />
                  <div className="media-body">
                    <h5 className="mt-0">
                      {commentSelected.comment.displayName}
                    </h5>
                    <span className="font-italic">
                      {commentSelected.comment.displayMessage}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <strong>Canal ID:</strong>
                <span className="font-italic">
                  {commentSelected.livestreamChannelId}
                </span>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
