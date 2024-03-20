import FormGroup from "./FormGroup";

export default function SuspensePostForm() {
  return (
    <>
      <div className="form-row">
        <FormGroup>
          <label>Title</label>
          <input className="skeleton skeleton-input" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="userId">Author</label>
          <input className="skeleton skeleton-input" />
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup>
          <label htmlFor="body">Body</label>
          <div className="skeleton skeleton-input"></div>
        </FormGroup>
      </div>
    </>
  );
}
