document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".nav-link");
    const sections = [...links].map(link =>
        document.querySelector(link.getAttribute("href"))
    );

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    links.forEach(link => {
                        const isActive =
                            link.getAttribute("href") === `#${entry.target.id}`;

                        link.classList.toggle("text-yellow-500", isActive);
                        link.querySelector(".dot")
                            .classList.toggle("bg-yellow-500", isActive);
                        link.querySelector(".dot")
                            .classList.toggle("bg-white", !isActive);
                    });
                }
            });
        },
        {
            threshold: 0.6
        }
    );

    sections.forEach(section => {
        if (section) observer.observe(section);
    });
});