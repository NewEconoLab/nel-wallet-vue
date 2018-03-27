﻿namespace Neo.IO
{
    export interface ISerializable
    {
        deserialize(reader: BinaryReader): void;
        serialize(writer: BinaryWriter): void;
    }
}
