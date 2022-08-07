/* This example requires Tailwind CSS v2.0+ */
export default function Description({ title }) {
    return (
        <div className="pb-5 ">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
            </p>
        </div>
    );
}
