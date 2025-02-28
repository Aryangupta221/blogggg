import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = '' }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name || 'Content'}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="j1dtcdul6ccvscmjjh6ysrql3nd10wifkebkm0e8oc7f7wf6" // Replace with your TinyMCE API key
            value={value} // Use `value` directly instead of `initialValue` for controlled behavior
            init={{
              height: 500,
              menubar: true,
              directionality: 'ltr',
              plugins: [
                'image',
                'advlist',
                'autolink',
                'lists',
                'link',
                'charmap',
                'preview',
                'anchor',
                'searchreplace',
                'visualblocks',
                'code',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'wordcount',
              ],
              toolbar:
                'undo redo | blocks | image | bold italic | alignleft aligncenter alignright | ' +
                'bullist numlist outdent indent | removeformat',
              content_style:
                'body { direction: ltr; font-family: Helvetica, Arial, sans-serif; font-size: 14px; }',
              branding: false,
              skin: 'oxide',
            }}
            onEditorChange={(newValue, editor) => {
              onChange(newValue); // Ensure this updates the form state correctly
              // Prevent unnecessary resets by ensuring TinyMCE stays in sync
            }}
          />
        )}
      />
    </div>
  );
}