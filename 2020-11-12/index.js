class Program {

    constructor(helloService) {
        this.helloService = helloService;
    }

    do(name) {
        this.helloService.hello(name);
    }

    static main(args) {
        const lang = args && args.length > 1 ? args[2] : "PL";

        console.log("ARGS", args, lang);

        const context = new Context({
            repository: (context) => new HelloRepository(lang),
            helloService: (context) =>
                new HelloWorldService(context.get("repository")),
            program: (context) => new Program(context.get("helloService")),
        });

        const program = context.get("program");
        program.do("damian");
    }
}

class HelloRepository {
    constructor(lang = "PL") {
        console.log("LANG", lang);
        this.lang = lang;
    }

    getHello() {
        switch (this.lang) {
            case "PL":
                return "Cześć";
            case "EN":
                return "Hello";
            default:
                return "Cześć";
        }
    }
}

class HelloWorldService {
    constructor(helloRepository) {
        this.helloRepository = helloRepository;
    }

    hello(name) {
        const helloWord = this.helloRepository.getHello();
        console.log(`${helloWord}, ${name}`);
    }
}

class Context {
    constructor(context) {
        this.context = context;
    }

    get(componentName) {
        return this.context[componentName](this);
    }
}

Program.main(process.argv);