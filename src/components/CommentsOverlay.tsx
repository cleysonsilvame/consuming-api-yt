import { ICommentSelected } from '../types/youtubeTypes';

type ICommentsOverlayProps = {
  commentSelected: ICommentSelected;
  button: {
    name: string;
    style: string;
  };
};

export default function CommentsOverlay({
  commentSelected,
  button,
}: ICommentsOverlayProps) {
  return (
    <>
      <button
        className={button.style}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        {button.name}
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Comentário Selecionado</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {commentSelected && (
                <div>
                  <div className="card p-2 my-2">
                    <div className="media d-flex align-items-center">
                      <img
                        src={commentSelected.comment?.profileImageUrl}
                        className="me-3 rounded-circle"
                        alt="..."
                        width="60rem"
                      />
                      <div className="media-body">
                        <h5 className="mt-0">
                          {commentSelected.comment?.displayName}
                        </h5>
                        <span className="font-italic">
                          {commentSelected.comment?.displayMessage}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
