function Title({ subtitle, children }: TitleProps) {
  return (
    <article className="mt-8 flex flex-col items-center gap-4 text-center">
      <h1 className="text-3xl font-bold md:text-5xl">{children}</h1>
      <p className="text-muted-foreground md:text-xl">{subtitle}</p>
    </article>
  );
}

export default Title;
