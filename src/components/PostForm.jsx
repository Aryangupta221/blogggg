import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, RTE, Select } from './index';
import appwriteService from '../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || '',
      Content: post?.Content || '', // Update to match Appwrite's field name
      Status: post?.Status || 'active',
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log('Form data:', data);
    if (!userData || !userData.$id) {
      console.error('User not logged in. Cannot create post.');
      alert('Please log in to create a post.');
      navigate('/login');
      return;
    }

    if (post) {
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) appwriteService.deleteFile(post.featuredImage);
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    } else {
      try {
        // Validate Content before submission
        if (!data.Content || data.Content.trim() === '') {
          console.error('Content is required and cannot be empty.');
          alert('Please enter content for the post.');
          return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);
        console.log('Uploaded file:', file);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;
          const dbPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
            Content: data.Content, // Use 'Content' to match Appwrite
          });
          console.log('Created post:', dbPost);

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      } catch (error) {
        console.error('Error creating post:', error);
        if (error.message) {
          alert(`Failed to create post: ${error.message}. Please check the console for details.`);
        } else {
          alert('Failed to create post. Please check the console for details.');
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string')
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, '-')
        .replace(/\s/g, '-');
    return '';
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      console.log('Watching field:', name, value);
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap gap-6 p-6 bg-white rounded-xl shadow-soft"
    >
      <div className="w-full lg:w-2/3">
        <Input
          label="Title:"
          placeholder="Enter post title"
          className="mb-6"
          {...register('title', { required: true })}
        />
        <Input
          label="Slug:"
          placeholder="Slug (auto-generated)"
          className="mb-6"
          {...register('slug', { required: true })}
          onInput={(e) =>
            setValue('slug', slugTransform(e.currentTarget.value), { shouldValidate: true })
          }
        />
        <RTE
          label="Content:"
          name="Content" // Update the name to match Appwrite's field name
          control={control}
          defaultValue={post?.Content || ''}
          onChange={(value) => setValue('Content', value || '<p></p>', { shouldValidate: true })}
        />
      </div>
      <div className="w-full lg:w-1/3">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-6"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register('image', { required: !post })}
        />
        {post && (
          <div className="w-full mb-6">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg w-full h-48 object-cover"
            />
          </div>
        )}
        <Select
          options={['active', 'inactive']}
          label="Status:"
          className="mb-6"
          {...register('Status', { required: true })}
        />
        <Button type="submit" bgColor={post ? 'bg-green-500' : 'bg-indigo-600'} className="w-full">
          {post ? 'Update' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}