import Link from "next/link";

export default function Breadcrumb({ items = [] }) {
    
    return (
        <div className="md:my-7.5 my-5">
            <div className="container">
                <nav className="text-sm my-4" aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center p-0 m-0 list-none">
                        {items.map((item, index) => (
                            <li key={index} className="flex items-center">
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="hover:text-secondary"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-secondary">
                                        {item.label}
                                    </span>
                                )}

                                {index !== items.length - 1 && (
                                    <span className="mx-2 divider">|</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    );
}
