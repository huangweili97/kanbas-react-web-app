export default function ModuleEditor({
  dialogTitle,
  moduleName,
  setModuleName,
  setModuleDescription,
  addModule,
}: {
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  setModuleDescription: (description: string) => void;
  addModule: () => void;
}) {
  return (
    <div
      id="wd-add-module-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}{" "}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control mb-2"
              defaultValue={moduleName}
              placeholder="Module Name"
              onChange={(e) => setModuleName(e.target.value)}
            />
            <textarea
              className="form-control"
              placeholder="Module Description"
              onChange={(e) => setModuleDescription(e.target.value)} // 新增处理 description 的方法
            ></textarea>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel{" "}
            </button>
            <button
              onClick={addModule}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Add Module{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
