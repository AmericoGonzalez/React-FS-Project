import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      title: "",
      category: "",
      image: "",
      content: "",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(`${DOMAIN}/api/posts`, values);
      if (res?.data.success) {
        // Extract form values
        const { title, category, image, content } = values;
        // Add post to fakedb
        addPost(title, category, content, image, "userId_placeholder"); // Replace "userId_placeholder" with actual user ID
        navigate("/posts");
      }
    } catch (error) {
      console.error("Error submitting form:", error); // Log any errors
    }
  };
  
  
  

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default CreatePostPage;
