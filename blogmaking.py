import os
import json
import markdown
import yaml
from datetime import datetime
from markdown.extensions import Extension
from markdown.treeprocessors import Treeprocessor
from markdown.extensions.extra import ExtraExtension
from markdown.extensions.toc import TocExtension
from markdown.extensions.attr_list import AttrListExtension
from markdown.extensions.tables import TableExtension
from markdown.extensions.codehilite import CodeHiliteExtension
from markdown.extensions.fenced_code import FencedCodeExtension
from markdown.extensions.footnotes import FootnoteExtension

BLOGS_DIR = "./blogs"
MD_DIR = "./b"
JSON_FILE_PATH = "./json/blog-list-blog.json"
TEMPLATE_PATH = "./template-blog.html"
DATE_FORMAT = "%B %d, %Y"

class AddClassesTreeprocessor(Treeprocessor):
    def run(self, root):
        for elem in root.iter():
            # We use semantic classes now, not rigid Bootstrap sizes
            if elem.tag == "h1":
                elem.set("class", "article-h1 fw-bold mt-5 mb-3")
            elif elem.tag == "h2":
                elem.set("class", "article-h2 fw-bold mt-5 mb-3")
            elif elem.tag == "h3":
                elem.set("class", "article-h3 fw-bold mt-4 mb-2")
            elif elem.tag == "p":
                # Removed 'fs-5' to let CSS control font size
                elem.set("class", "article-paragraph mb-4")
            elif elem.tag in ["ul", "ol"]:
                elem.set("class", "article-list mb-4")
            elif elem.tag == "li":
                elem.set("class", "article-list-item")
            elif elem.tag == "blockquote":
                elem.set("class", "article-blockquote p-4 my-4 fst-italic border-start border-3 border-dark bg-light")
            elif elem.tag == "pre":
                elem.set("class", "article-code-block p-3 bg-light border rounded my-4")
            elif elem.tag == "table":
                elem.set("class", "table table-hover table-bordered my-4")
            elif elem.tag == "img":
                elem.set("class", "img-fluid rounded shadow-sm my-4")
        return root

class CustomExtension(Extension):
    def extendMarkdown(self, md):
        md.treeprocessors.register(AddClassesTreeprocessor(md), "add_classes", 15)

EXTENSIONS = [
    CustomExtension(),
    ExtraExtension(),
    TocExtension(permalink=False),
    AttrListExtension(),
    TableExtension(),
    CodeHiliteExtension(linenums=True, guess_lang=False, css_class="codehilite"),
    FencedCodeExtension(),
    FootnoteExtension()
]

def extract_metadata(md_file_path):
    with open(md_file_path, "r", encoding="utf-8") as f:
        content = f.read()
    parts = content.split("---", 2)
    if len(parts) < 3:
        return None, content
    metadata = yaml.safe_load(parts[1])
    return metadata, parts[2]

def convert_md_to_html(md_file_path, template_path, output_path):
    metadata, md_content = extract_metadata(md_file_path)
    if not metadata:
        print(f"Skipping {md_file_path} due to missing metadata")
        return
    
    html_content = markdown.markdown(md_content, extensions=EXTENSIONS)
    
    with open(template_path, "r", encoding="utf-8") as f:
        template = f.read()
    
    replacements = {
        "blog-title": metadata.get("title", ""),
        "blog-description": metadata.get("description", ""),
        "blog-feature2": metadata.get("category", "Blog"),
        "blog-image": metadata.get("image", ""),
        "blog-date": metadata.get("date", ""),
        "blog-read-time": metadata.get("read_time", ""),
        "primary-image__figcap_1-0": metadata.get("image_credit", ""),
        "POST_CONTENT": html_content
    }
    
    for key, value in replacements.items():
        template = template.replace(f"{{{{ {key} }}}}", str(value))
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(template)

def process_all_posts(md_dir, template_path, output_dir):
    for filename in os.listdir(md_dir):
        if filename.endswith(".md"):
            md_path = os.path.join(md_dir, filename)
            output_path = os.path.join(output_dir, filename.replace(".md", ".html"))
            convert_md_to_html(md_path, template_path, output_path)
    update_blog_list_json(md_dir, output_dir)

def update_blog_list_json(md_dir, blogs_dir):
    blog_files = os.listdir(blogs_dir)
    dated_blogs = []
    undated_blogs = []
    
    for blog_file in blog_files:
        if blog_file.endswith(".html"):
            md_path = os.path.join(md_dir, blog_file.replace(".html", ".md"))
            if os.path.exists(md_path):
                metadata, _ = extract_metadata(md_path)
                if metadata and "date" in metadata:
                    try:
                        blog_date = datetime.strptime(metadata["date"], DATE_FORMAT)
                        dated_blogs.append((blog_date, f"blogs/{blog_file}"))
                    except ValueError:
                        undated_blogs.append(f"blogs/{blog_file}")
                else:
                    undated_blogs.append(f"blogs/{blog_file}")
            else:
                undated_blogs.append(f"blogs/{blog_file}")
    
    dated_blogs.sort(reverse=True, key=lambda x: x[0])
    sorted_blog_list = [entry[1] for entry in dated_blogs] + undated_blogs
    
    with open(JSON_FILE_PATH, "w", encoding="utf-8") as json_file:
        json.dump(sorted_blog_list, json_file, indent=2)
    
    print(f"Updated {JSON_FILE_PATH} with {len(sorted_blog_list)} entries.")

if __name__ == "__main__":
    process_all_posts(MD_DIR, TEMPLATE_PATH, BLOGS_DIR)