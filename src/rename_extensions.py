import os

def rename_file_extensions(directory, target_extension, replacement_extension):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith(target_extension):
                # Split the file name and extension
                name, extension = os.path.splitext(filename)

                # Rename the file with the new extension
                new_filename = name + replacement_extension
                old_path = os.path.join(root, filename)
                new_path = os.path.join(root, new_filename)
                os.rename(old_path, new_path)

                print(f"Renamed: {old_path} -> {new_path}")

# Prompt the user to input the directory path
directory_path = input("Enter the directory path: ")

# Prompt the user to input the target extension and its replacement
target_extension = input("Enter the target extension (e.g., .jsx): ")
replacement_extension = input("Enter the replacement extension (e.g., .tsx): ")

# Call the function to rename file extensions
rename_file_extensions(directory_path, target_extension, replacement_extension)
